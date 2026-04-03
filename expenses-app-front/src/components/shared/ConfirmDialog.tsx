import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, CircularProgress
} from '@mui/material'

interface Props {
  open:        boolean
  title:       string
  description: string
  isLoading:   boolean
  onConfirm:   () => void
  onCancel:    () => void
}

export default function ConfirmDialog({
  open, title, description, isLoading, onConfirm, onCancel
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : 'Deletar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}