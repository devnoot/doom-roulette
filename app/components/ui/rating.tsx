import { cn } from '../../lib/utils'
import { Star, StarHalf } from 'lucide-react'

export type RatingProps = {
  rating: number
}

export const Rating = ({ rating }: RatingProps) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  // const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className={cn('inline-flex')}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} />
      ))}
      {halfStar === 1 && <StarHalf />}
      {/* {Array.from({ length: emptyStars }, (_, i) => <Star key={`empty-${i}`} fill="none" stroke="currentColor" />)} */}
      <div>{rating.toFixed(2)} / 5</div>
    </div>
  )
}
