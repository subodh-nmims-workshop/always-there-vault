'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Link as LinkIcon, Copy, Check, X, Mail, Clock, Eye, Download, Trash2, Shield } from 'lucide-react'
import WebStorageService, { StoredAsset } from '@/lib/storage'
import { ConfirmationDialog } from './confirmation-dialog'
import { toast } from 'sonner'

interface ShareLink {
  id: string
  assetId: string
  assetName: string
  shareUrl: string
  permissions: 'view' | 'download'
  expiresAt: Date | null
  createdAt: Date
  accessCount: number
}

interface AssetSharingModalProps {
  asset: StoredAsset
  isOpen: boolean
  onClose: () => void
}

export function AssetSharingModal({ asset, isOpen, onClose }: AssetSharingModalProps) {
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [revokeConfirmation, setRevokeConfirmation] = useState<{ isOpen: boolean; linkId: string | null }>({
    isOpen: false,
    linkId: null
  })
  const [newShareForm, setNewShareForm] = useState({
    permissions: 'view' as 'view' | 'download',
    expiresIn: '7' // days
  })

  const storage = WebStorageService.getInstance()

  useEffect(() => {
    if (isOpen) {
      loadShareLinks()
    }
  }, [isOpen, asset.id])

  const loadShareLinks = () => {
    // Load share links from localStorage
    const stored = localStorage.getItem(`dwp_share_links_${asset.id}`)
    if (stored) {
      const links = JSON.parse(stored)
      // Convert date strings back to Date objects
      const parsedLinks = links.map((link: any) => ({
        ...link,
        expiresAt: link.expiresAt ? new Date(link.expiresAt) : null,
        createdAt: new Date(link.createdAt)
      }))
      setShareLinks(parsedLinks)
    }
  }

  const generateShareLink = async () => {
    setIsCreating(true)
    try {
      // Generate unique share ID
      const shareId = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const shareUrl = `${window.location.origin}/shared/${shareId}`

      const expiresAt = newShareForm.expiresIn !== 'never'
        ? new Date(Date.now() + parseInt(newShareForm.expiresIn) * 24 * 60 * 60 * 1000)
        : null

      const newLink: ShareLink = {
        id: shareId,
        assetId: asset.id,
        assetName: asset.name,
        shareUrl,
        permissions: newShareForm.permissions,
        expiresAt,
        createdAt: new Date(),
        accessCount: 0
      }

      // Save to localStorage
      const updatedLinks = [...shareLinks, newLink]
      localStorage.setItem(`dwp_share_links_${asset.id}`, JSON.stringify(updatedLinks))

      // Also save the share link data globally for access
      const allShares = JSON.parse(localStorage.getItem('dwp_all_share_links') || '{}')
      allShares[shareId] = {
        assetId: asset.id,
        permissions: newLink.permissions,
        expiresAt: newLink.expiresAt,
        encryptedData: asset.encryptedData,
        keyId: asset.keyId,
        iv: asset.iv,
        metadata: {
          name: asset.name,
          type: asset.type,
          size: asset.size
        }
      }
      localStorage.setItem('dwp_all_share_links', JSON.stringify(allShares))

      setShareLinks(updatedLinks)
      toast.success('Share link generated', {
        description: 'Copy the link and share it securely.'
      })

      // Reset form
      setNewShareForm({
        permissions: 'view',
        expiresIn: '7'
      })
    } catch (error) {
      console.error('Failed to create share link:', error)
      toast.error('Failed to create share link')
    } finally {
      setIsCreating(false)
    }
  }

  const copyToClipboard = async (link: ShareLink) => {
    try {
      await navigator.clipboard.writeText(link.shareUrl)
      setCopiedId(link.id)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const revokeShareLink = (linkId: string) => {
    setRevokeConfirmation({ isOpen: true, linkId })
  }

  const confirmRevoke = () => {
    if (!revokeConfirmation.linkId) return

    const updatedLinks = shareLinks.filter(link => link.id !== revokeConfirmation.linkId)
    localStorage.setItem(`dwp_share_links_${asset.id}`, JSON.stringify(updatedLinks))

    // Remove from global shares
    const allShares = JSON.parse(localStorage.getItem('dwp_all_share_links') || '{}')
    delete allShares[revokeConfirmation.linkId]
    localStorage.setItem('dwp_all_share_links', JSON.stringify(allShares))

    setShareLinks(updatedLinks)
    setRevokeConfirmation({ isOpen: false, linkId: null })
    toast.success('Share link revoked')
  }

  const isExpired = (link: ShareLink) => {
    return link.expiresAt && link.expiresAt < new Date()
  }

  if (!isOpen) return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <Share2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Share Asset</h3>
                  <p className="text-sm text-slate-400 mt-1">{asset.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Create New Share Link */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 mb-6">
              <h4 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">Create Share Link</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Permissions</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNewShareForm(prev => ({ ...prev, permissions: 'view' }))}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${newShareForm.permissions === 'view'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                      <Eye className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs font-semibold">View Only</span>
                    </button>
                    <button
                      onClick={() => setNewShareForm(prev => ({ ...prev, permissions: 'download' }))}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${newShareForm.permissions === 'download'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                      <Download className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs font-semibold">Download</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Expires In</label>
                  <select
                    value={newShareForm.expiresIn}
                    onChange={(e) => setNewShareForm(prev => ({ ...prev, expiresIn: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none"
                  >
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <button
                  onClick={generateShareLink}
                  disabled={isCreating}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <LinkIcon className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4" />
                      Generate Share Link
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Existing Share Links */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">Active Share Links</h4>

              {shareLinks.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/30 rounded-xl border border-slate-800">
                  <Share2 className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-slate-400 text-sm">No share links created yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shareLinks.map((link) => (
                    <div
                      key={link.id}
                      className={`bg-slate-950/50 border rounded-xl p-4 ${isExpired(link) ? 'border-red-500/20 opacity-60' : 'border-slate-800'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {link.permissions === 'view' ? (
                              <Eye className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Download className="w-4 h-4 text-green-400" />
                            )}
                            <span className="text-sm font-semibold text-slate-200 capitalize">
                              {link.permissions}
                            </span>
                            {isExpired(link) && (
                              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-semibold">
                                Expired
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {link.expiresAt ? (
                              <span>Expires {link.expiresAt.toLocaleDateString()}</span>
                            ) : (
                              <span>Never expires</span>
                            )}
                            <span className="mx-1">•</span>
                            <span>Accessed {link.accessCount} times</span>
                          </div>
                        </div>
                        <button
                          onClick={() => revokeShareLink(link.id)}
                          className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                        <LinkIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input
                          type="text"
                          value={link.shareUrl}
                          readOnly
                          className="flex-1 bg-transparent text-slate-400 text-xs font-mono outline-none"
                        />
                        <button
                          onClick={() => copyToClipboard(link)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                        >
                          {copiedId === link.id ? (
                            <>
                              <Check className="w-3 h-3 text-green-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-300">
                  <p className="font-semibold text-amber-300 mb-1">Security Notice</p>
                  <p className="text-xs">Share links provide access to encrypted asset data. Anyone with the link can access the asset according to the permissions set. Revoke links when no longer needed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Revoke Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={revokeConfirmation.isOpen}
        onClose={() => setRevokeConfirmation({ isOpen: false, linkId: null })}
        onConfirm={confirmRevoke}
        title="Revoke Share Link?"
        message="Are you sure you want to revoke this share link? It will no longer be accessible to anyone who has it."
        confirmText="Revoke"
        cancelText="Cancel"
        type="warning"
      />
    </>
  )
}
