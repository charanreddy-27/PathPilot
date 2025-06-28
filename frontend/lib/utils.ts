"use client"

import * as React from 'react'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for combining Tailwind CSS classes with proper specificity
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
