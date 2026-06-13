'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Lock, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { 
  getCategoryTemplate, 
  generateStructuredData, 
  validateCategoryData,
  type AssetCategory,
  type CategoryTemplate,
  type CategoryField
} from '@/lib/category-handlers'
import { Shield, CheckCircle } from 'lucide-react'

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category: AssetCategory
  beneficiaries: any[]
  onSubmit: (data: { name: string; type: string; structuredData: string; file?: File; beneficiaryIds?: string[]; timeCapsule?: { scheduledDate: string; customMessage: string } }) => Promise<void>
}

export function CategoryModal({ isOpen, onClose, category, beneficiaries, onSubmit }: CategoryModalProps) {
  const [template, setTemplate] = useState<CategoryTemplate | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedBens, setSelectedBens] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [isTimeCapsule, setIsTimeCapsule] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [customMessage, setCustomMessage] = useState('')

  useEffect(() => {
    if (isOpen && category) {
      try {
        console.log('🔄 Initializing category modal for:', category)
        const tmpl = getCategoryTemplate(category)
        console.log('✅ Template loaded:', tmpl.label, 'with', tmpl.fields.length, 'fields')
        setTemplate(tmpl)
        setFormData({})
        setSelectedFile(null)
        setIsDragging(false)
        setSelectedBens([])
        setErrors([])
        setShowSuccess(false)
        setIsTimeCapsule(false)
        setScheduledDate('')
        setCustomMessage('')
      } catch (error) {
        console.error('❌ Failed to initialize category modal:', error)
        setErrors(['Initialization failed. Please try again.'])
      }
    }
  }, [isOpen, category])

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    setErrors([]) // Clear errors on change
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!template) return

    // Validate
    const validation = validateCategoryData(template, formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    setErrors([])

    try {
      console.log('📝 Form data:', formData)
      
      // Generate structured data
      const structuredData = generateStructuredData(template, formData)
      console.log('📄 Generated structured data length:', structuredData.length)
      
      // Get asset name from first field or use template label
      const assetName = formData[template.fields[0]?.name] || `${template.label} - ${new Date().toLocaleDateString()}`
      console.log('🏷️ Asset name:', assetName)

      await onSubmit({
        name: assetName,
        type: category,
        structuredData,
        file: selectedFile || undefined,
        beneficiaryIds: selectedBens,
        timeCapsule: isTimeCapsule && scheduledDate ? { scheduledDate, customMessage } : undefined
      })

      setShowSuccess(true)
      setTimeout(() => {
        onClose()
        setFormData({})
        setSelectedFile(null)
      }, 1500)
    } catch (error: any) {
      console.error('❌ Submit error:', error)
      const errorMessage = error?.message || 'Failed to save asset. Please try again.'
      setErrors([errorMessage])
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: CategoryField) => {
    const value = formData[field.name] || ''

    const fieldClasses = "w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-inner"

    return (
      <div key={field.name} className="space-y-2">
        <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-400 font-bold">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
          {field.encrypted && <Lock className="inline-block w-3 h-3 ml-2 text-yellow-400" />}
        </label>

        {field.type === 'text' && (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={fieldClasses}
          />
        )}

        {field.type === 'password' && (
          <input
            type="password"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`${fieldClasses} font-mono`}
          />
        )}

        {field.type === 'number' && (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={fieldClasses}
          />
        )}

        {field.type === 'textarea' && (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.encrypted ? 4 : 3}
            className={`${fieldClasses} resize-none ${field.encrypted ? 'font-mono' : ''}`}
          />
        )}

        {field.type === 'select' && (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={fieldClasses}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {field.helpText && (
          <p className="text-xs text-slate-500 flex items-start gap-1 mt-1">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>{field.helpText}</span>
          </p>
        )}
      </div>
    )
  }

  if (!template) return null

  const Icon = template.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className={`${template.bgColor} border-b border-slate-200 dark:border-white/10 p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${template.bgColor} flex items-center justify-center ${template.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{template.label}</h2>
                    <p className="text-xs text-slate-800 dark:text-slate-400 mt-1">{template.instructions}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/10 border-b border-green-500/20 p-4"
                >
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Asset saved successfully!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-500/10 border-b border-red-500/20 p-4">
                <div className="flex items-start gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    {errors.map((error, idx) => (
                      <p key={idx} className="text-sm">{error}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-5">
              {/* Examples */}
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">Examples</p>
                <div className="flex flex-wrap gap-2">
                  {template.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nominee Selection */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Assign Nominees
                    </h4>
                    <p className="text-[10px] text-slate-700 uppercase tracking-widest font-bold mt-1">
                      Who will receive this asset?
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    {selectedBens.length} selected
                  </span>
                </div>

                {beneficiaries.length === 0 ? (
                  <p className="text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    No nominees configured. Go to 'Beneficiaries' to add them.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                    {beneficiaries.map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBens(prev => 
                          prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                        )}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all ${
                          selectedBens.includes(b.id)
                            ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                            : 'bg-slate-100 dark:bg-black/20 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/10'
                        }`}
                      >
                        <span className="text-xs font-semibold truncate flex-1 mr-2">{b.name}</span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                          selectedBens.includes(b.id)
                            ? 'bg-blue-500 border-blue-400'
                            : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10'
                        }`}>
                          {selectedBens.includes(b.id) && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Capsule Toggle */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTimeCapsule(!isTimeCapsule)}>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">🕰️</span>
                      Schedule Delivery (Time Capsule)
                    </h4>
                    <p className="text-[10px] text-slate-700 uppercase tracking-widest font-bold mt-1">
                      Deliver this on a specific date regardless of your heartbeat
                    </p>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${isTimeCapsule ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" style={{ x: isTimeCapsule ? 24 : 0 }} />
                  </div>
                </div>

                <AnimatePresence>
                  {isTimeCapsule && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden pt-2"
                    >
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-400 font-bold">
                          Delivery Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-400 font-bold">
                          Personal Message (Optional)
                        </label>
                        <textarea
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder="e.g. Happy 18th Birthday! Here are your crypto assets."
                          rows={3}
                          className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Fields */}
              {template.fields.map(field => renderField(field))}

              {/* Optional File Upload */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-400 font-bold">
                  Attach File (Optional)
                </label>
                <div 
                  className={`relative border border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-500/10 scale-[1.01] shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                      : selectedFile 
                        ? 'border-blue-500 bg-blue-500/5' 
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-white/[0.02] hover:border-slate-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="category-file-upload"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-1">
                        <CheckCircle className="h-5 w-5 text-emerald-500 shadow-lg shadow-emerald-500/20" />
                      </div>
                      <p className="text-slate-800 dark:text-white font-bold truncate max-w-[250px] text-sm">{selectedFile.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                          className="relative z-20 text-xs text-red-500 hover:text-red-400 font-semibold underline bg-transparent border-none p-0 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-2">
                        <Upload className={`w-5 h-5 transition-transform duration-300 ${isDragging ? 'translate-y-[-2px] text-blue-500' : 'text-slate-500'}`} />
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white mb-1">
                        {isDragging ? 'Drop your file here' : 'Drag & drop file or click to browse'}
                      </p>
                      <p className="text-[10px] text-slate-500">Supports documents, photos, keys up to 50MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-white/10 p-6 bg-slate-50 dark:bg-black/20">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  <Lock className="inline-block w-3 h-3 mr-1" />
                  All sensitive data is encrypted with AES-256-GCM
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white rounded-xl transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? 'Encrypting...' : 'Save Securely'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
