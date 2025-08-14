import { ReactNode } from 'react'
import SectionHeader from './section-header'
import MoreButton from './more-button'

interface SectionProps {
  sectionClassName?: string
  sectionHeaderTitle: string
  sectionHeaderDescription?: string
  moreButtonLabel?: string
  moreButtonPath?: string
  moreButtonClassName?: string
  children?: ReactNode
}

export default function Section({
  sectionHeaderTitle,
  sectionHeaderDescription,
  sectionClassName,
  moreButtonLabel,
  moreButtonPath,
  moreButtonClassName,
  children,
}: SectionProps) {
  return (
    <section className={`flex justify-center flex-col py-16 gap-y-12 ${sectionClassName}`}>
      <SectionHeader title={sectionHeaderTitle} description={sectionHeaderDescription} />

      {children && children}

      {moreButtonLabel && moreButtonPath && (
        <div className='mx-auto'>
          <MoreButton
            label={moreButtonLabel}
            path={moreButtonPath}
            className={moreButtonClassName}
          />
        </div>
      )}
    </section>
  )
}
