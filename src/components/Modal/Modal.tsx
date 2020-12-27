import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

import Button from '../Button/Button'

import { Buttons, Card, Wrapper } from './Modal.styled'

interface IModalProps {
  text: string
  visible: boolean
  onClose: () => void
  onConfirm: () => void
}

const Modal = ({ text, visible, onClose, onConfirm }: IModalProps) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {visible && (
        <Wrapper>
          <Card
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, translateY: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaTimes onClick={onClose} />

            <p>{text}</p>

            <Buttons>
              <Button reversed onClick={onConfirm}>
                {t('scarabeus.yes')}
              </Button>
              <Button onClick={onClose}>{t('scarabeus.no')}</Button>
            </Buttons>
          </Card>
        </Wrapper>
      )}
    </AnimatePresence>
  )
}

export default Modal
