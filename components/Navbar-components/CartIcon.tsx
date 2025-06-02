import { ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  return (
    <Link href='/shopping-cart' className='group relative hoverEffect'>
        <ShoppingCart  className='hoverEffect w-5 h-5 hover:text-secondary-color hover:cursor-pointer'/>
        <span className={`absolute -top-3 -right-3 hoverEffect text-white text-[12px] bg-primary-color group-hover:bg-secondary-color rounded-full w-5 h-5 flex justify-center items-center`}>0</span>
    </Link>
  )
}

export default CartIcon