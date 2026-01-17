'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Mail, Wallet, Edit, Trash2, Check, X } from 'lucide-react'
import WebStorageService, { StoredBeneficiary } from '@/lib/storage'

export function BeneficiaryManager() {
  const [beneficiaries, setBeneficiaries] = useState<StoredBeneficiary[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const storage = WebStorageService.getInstance()

  useEffect(() => {
    loadBeneficiaries()
  }, [])

  const loadBeneficiaries = async () => {
    try {
      const stored = await storage.getAllBeneficiaries()
      setBeneficiaries(stored)
    } catch (error) {
      console.error('Failed to load beneficiaries:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.walletAddress) return

    setIsSubmitting(true)

    try {
      const beneficiary: StoredBeneficiary = {
        id: editingId || storage.generateId(),
        name: formData.name,
        email: formData.email,
        walletAddress: formData.walletAddress,
        createdAt: editingId ? beneficiaries.find(b => b.id === editingId)?.createdAt || Date.now() : Date.now(),
        enabled: true
      }

      await storage.saveBeneficiary(beneficiary)
      await loadBeneficiaries()
      
      // Reset form
      setFormData({ name: '', email: '', walletAddress: '' })
      setShowAddForm(false)
      setEditingId(null)

    } catch (error) {
      console.error('Failed to save beneficiary:', error)
      alert('Failed to save beneficiary. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (beneficiary: StoredBeneficiary) => {
    setFormData({
      name: beneficiary.name,
      email: beneficiary.email,
      walletAddress: beneficiary.walletAddress
    })
    setEditingId(beneficiary.id)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await storage.deleteBeneficiary(id)
        await loadBeneficiaries()
      } catch (error) {
        console.error('Failed to delete beneficiary:', error)
        alert('Failed to delete beneficiary.')
      }
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', email: '', walletAddress: '' })
    setShowAddForm(false)
    setEditingId(null)
  }

  const validateWalletAddress = (address: string): boolean => {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isFormValid = () => {
    return formData.name.trim() && 
           validateEmail(formData.email) && 
           validateWalletAddress(formData.walletAddress)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Beneficiary Management ({beneficiaries.length})</span>
            </div>
            <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficiary
            </Button>
          </CardTitle>
          <CardDescription>
            Manage who will receive your digital assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {beneficiaries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No beneficiaries added yet</p>
              <p className="text-sm">Add your first beneficiary to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{beneficiary.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {beneficiary.email}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Wallet className="h-3 w-3 mr-1" />
                          {beneficiary.walletAddress}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Added: {new Date(beneficiary.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(beneficiary)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(beneficiary.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Edit Beneficiary' : 'Add New Beneficiary'}
            </CardTitle>
            <CardDescription>
              Enter beneficiary details and wallet address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  placeholder="Beneficiary name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input 
                  type="email" 
                  className={`w-full p-2 border rounded-md ${
                    formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''
                  }`}
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Wallet Address *</label>
                <input 
                  type="text" 
                  className={`w-full p-2 border rounded-md font-mono text-sm ${
                    formData.walletAddress && !validateWalletAddress(formData.walletAddress) ? 'border-red-500' : ''
                  }`}
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, walletAddress: e.target.value }))}
                  required
                />
                {formData.walletAddress && !validateWalletAddress(formData.walletAddress) && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid Ethereum address (0x...)</p>
                )}
              </div>

              <div className="flex space-x-3">
                <Button 
                  type="submit"
                  className="flex-1"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Check className="h-4 w-4 mr-2 animate-spin" />
                      {editingId ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {editingId ? 'Update Beneficiary' : 'Add Beneficiary'}
                    </>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}