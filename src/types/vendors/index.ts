export interface IPendingApprovalsModalContentProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>
  onAccept: React.MouseEventHandler<HTMLButtonElement>
}

export interface IVendorsModalsContentProps extends IPendingApprovalsModalContentProps {
  approveType: string,
}

export enum EApproveType {
  ApproveSelect = 'ApproveSelect',
  ApproveAll = 'ApproveAll',
  RejectSelect = 'RejectSelect',
  RejectAll = 'RejectAll',
}