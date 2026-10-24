import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'
import { company as fallbackCompany, nav as fallbackNav, categories as fallbackCategories, industries as fallbackIndustries, capabilities as fallbackCapabilities, products as fallbackProducts } from '../data/site'

const DataContext = createContext(null)
export function DataProvider({ children }) {
  const [content, setContent] = useState({ company: fallbackCompany, nav: fallbackNav, categories: fallbackCategories, industries: fallbackIndustries, capabilities: fallbackCapabilities })
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const load = async () => { try { const [site, productList] = await Promise.all([api.get('/content'), api.get('/products')]); setContent(prev => ({ ...prev, ...site.data })); setProducts(productList.data) } catch (e) { console.warn('Using local site content while API is unavailable.', e) } finally { setLoading(false) } }
  useEffect(() => { load() }, [])
  const saveContent = async (next) => { const { data } = await api.put('/content', next); setContent(prev => ({ ...prev, ...data })); return data }
  const createProduct = async (product) => { const { data } = await api.post('/products', product); setProducts(prev => [...prev, data].sort((a,b) => a.order - b.order)); return data }
  const updateProduct = async (id, product) => { const { data } = await api.put(`/products/${id}`, product); setProducts(prev => prev.map(x => String(x._id) === String(id) ? data : x).sort((a,b) => a.order - b.order)); return data }
  const deleteProduct = async (id) => { await api.delete(`/products/${id}`); setProducts(prev => prev.filter(x => String(x._id) !== String(id))) }
  return <DataContext.Provider value={{ ...content, products, loading, reload: load, saveContent, createProduct, updateProduct, deleteProduct }}>{children}</DataContext.Provider>
}
export const useData = () => useContext(DataContext)
