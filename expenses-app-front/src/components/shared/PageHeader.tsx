import type { ReactNode } from 'react'
import { Typography } from '@mui/material'

interface Props {
  title:    string
  children?: ReactNode  // slot para botões de ação
}

export default function PageHeader({ title, children }: Props) {
  return (
    <div className="flex items-center justify-between mb-2">
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      {children}
    </div>
  )
}