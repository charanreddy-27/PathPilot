'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
    _id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token')
        if (token) {
            fetchUserProfile()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
            } else {
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
            localStorage.removeItem('token')
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to login')
        }

        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        await fetchUserProfile()
    }

    const register = async (email: string, password: string, name: string) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to register')
        }

        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        await fetchUserProfile()
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 