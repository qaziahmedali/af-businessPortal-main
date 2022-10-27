import React, { FC } from 'react'
import { EApproveType, IVendorsModalsContentProps } from '../../types/vendors';
import ApproveAllPendingApprovalsModalContent from './approve-all-pending-approvals-modal-content';
import ApprovePendingApprovalsModalContent from './approve-pending-approvals-modal-content';
import RejectPendingApprovalsModalContent from './reject-pending-approvals-modal-content';

const VendorsModalsContent:FC<IVendorsModalsContentProps> = (props:IVendorsModalsContentProps) => {
  const { approveType } = props;
  if (approveType === EApproveType.ApproveSelect) {
    return <ApprovePendingApprovalsModalContent {...props} />
  } else if (approveType === EApproveType.RejectSelect) {
    return <RejectPendingApprovalsModalContent {...props} />
  }
  return <ApproveAllPendingApprovalsModalContent {...props} />
}

export default VendorsModalsContent
