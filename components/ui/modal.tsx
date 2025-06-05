import React from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-zinc-900 rounded-lg p-6 text-white" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  )
} 