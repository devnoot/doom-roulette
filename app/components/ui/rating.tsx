import { Star, StarHalf } from 'lucide-react'

import { cn } from '../../lib/utils'

export type RatingProps = {
  rating: number
  className?: string
}

export const Rating = ({ rating, className }: RatingProps) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  return (
    <div className={cn('w-full', 'justify-between', className)}>
      <div className={cn('inline-flex', 'me-3')}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={`full-${i}`} className={cn('text-amber-400')} />
        ))}
        {halfStar === 1 && <StarHalf className='text-amber-400' />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} className='text-gray-700' />
        ))}
      </div>

      <div className="font-['Kode_Mono']">
        <small>Rated {rating.toFixed(2)} / 5</small>
      </div>
    </div>
  )
}
