export interface ModalProps {
  isOpen: boolean
  message: string        // 모달에 띄울 텍스트
  confirmAction: string  // 확인 시 dispatch할 액션 타입
}