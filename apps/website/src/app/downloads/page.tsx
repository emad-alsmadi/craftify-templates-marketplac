'use client';

import { useMyDownloads, useRecordDownload, useDeleteDownload } from '@/hooks/downloads/downloadsQuery';
import { Download } from '@/types';
import { Download as DownloadIcon, Trash2, FileText, Calendar, Hash } from 'lucide-react';
import { useState } from 'react';

export default function DownloadsPage() {
  const { data: downloads, isLoading, error } = useMyDownloads();
  const recordDownload = useRecordDownload();
  const deleteDownload = useDeleteDownload();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (download: Download) => {
    setDownloadingId(download._id);
    try {
      const result = await recordDownload.mutateAsync(download._id);
      // Open file URL in new tab
      if (result.fileUrl) {
        window.open(result.fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this download?')) {
      try {
        await deleteDownload.mutateAsync(id);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold  mb-8">My Downloads</h1>
          <div className="">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold  mb-8">My Downloads</h1>
          <div className="text-red-400">Failed to load downloads</div>
        </div>
      </div>
    );
  }

  if (!downloads || downloads.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold  mb-8">My Downloads</h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
            <DownloadIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl  mb-2">No downloads yet</h2>
            <p className="text-gray-300">
              After purchasing templates, they will appear here for download.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold  mb-8">My Downloads</h1>

        <div className="grid gap-6">
          {downloads.map((download) => {
            const remainingDownloads = download.downloadLimit - download.downloadCount;
            const isLimitReached = remainingDownloads <= 0;

            return (
              <div
                key={download._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Template Image */}
                  <div className="w-full md:w-32 h-32 flex-shrink-0">
                    <img
                      src={download.template.cover}
                      alt={download.template.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Template Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold  mb-2">
                      {download.template.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {download.template.description}
                    </p>

                    {/* Download Stats */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        <span>Downloads: {download.downloadCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Remaining: {remainingDownloads}</span>
                      </div>
                      {download.lastDownloadDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Last: {formatDate(download.lastDownloadDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center">
                    <button
                      onClick={() => handleDownload(download)}
                      disabled={
                        isLimitReached ||
                        downloadingId === download._id ||
                        recordDownload.isPending
                      }
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        isLimitReached
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-cyan-600  hover:from-purple-700 hover:to-cyan-700'
                      }`}
                    >
                      <DownloadIcon className="w-5 h-5" />
                      {downloadingId === download._id ? 'Downloading...' : 'Download'}
                    </button>

                    <button
                      onClick={() => handleDelete(download._id)}
                      disabled={deleteDownload.isPending}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-gray-400 hover: hover:bg-white/10 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Limit Warning */}
                {isLimitReached && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">
                      Download limit reached. You have used all {download.downloadLimit}{' '}
                      allowed downloads.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
