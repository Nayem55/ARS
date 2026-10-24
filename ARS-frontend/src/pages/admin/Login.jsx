import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const { login } = useAuth(); const navigate = useNavigate()
  const submit = async (e) => { e.preventDefault(); setSaving(true); try { await login(username, password); navigate('/admin') } catch (err) { toast.error(err.response?.data?.error || 'Sign in failed') } finally { setSaving(false) } }
  return <main className="min-h-screen bg-surface flex items-center justify-center p-5"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"><img src="/images/logo.png" alt="ARS" className="h-14 w-auto" /><h1 className="mt-7 text-2xl font-bold text-navy">ARS Admin Panel</h1><p className="mt-1 text-sm text-slate-500">Manage website content, categories and products.</p><label className="mt-6 block text-xs font-bold text-slate-600">USERNAME<input className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" value={username} onChange={e => setUsername(e.target.value)} required /></label><label className="mt-4 block text-xs font-bold text-slate-600">PASSWORD<div className="relative mt-1.5"><input type={showPassword ? 'text' : 'password'} className="w-full rounded-lg border border-slate-300 py-2.5 pr-11 pl-3 text-sm" value={password} onChange={e => setPassword(e.target.value)} required /><button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-navy">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label><button disabled={saving} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-mid"><LogIn className="h-4 w-4" />{saving ? 'Signing in...' : 'Sign In'}</button><p className="mt-5 text-center text-xs text-slate-400">Initial login: admin / admin123</p></form></main>
}
