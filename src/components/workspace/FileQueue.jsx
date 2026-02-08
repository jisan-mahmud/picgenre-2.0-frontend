import React from 'react'
import { Clock, FileText, Trash2 } from 'lucide-react'

export default function FileQueue({ files = [], onRemove }) {
    const getFileType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png'].includes(ext)) return 'Image'
        if (ext === 'eps') return 'Vector'
        return 'File'
    }

    const getFilePreview = (file) => {
        const ext = file.name.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png'].includes(ext)) {
            return URL.createObjectURL(file)
        }
        return null
    }

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Remaining Queue ({files.length})</h3>
                </div>
                <span className="text-xs font-bold text-slate-400">{files.length > 0 ? 'Processing...' : 'Empty'}</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900">
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Preview</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Filename</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400 text-sm">No files in queue</td>
                            </tr>
                        ) : (
                            files.map((file, index) => {
                                const preview = getFilePreview(file)
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
                                                {preview ? (
                                                    <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FileText className="w-6 h-6 text-slate-400" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-white text-sm font-medium max-w-50 truncate">{file.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{getFileType(file.name)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => onRemove?.(index)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
