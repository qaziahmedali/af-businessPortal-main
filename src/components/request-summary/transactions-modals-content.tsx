import React, { FC } from 'react'
import { EApproveType, IVendorsModalsContentProps } from '../../types/vendors';
import ApproveAllPendingApprovalsTransactionsModalContent from './approve-all-pending-approvals-modal-content';
import ApprovePendingApprovalsTransactionModalContent from './approve-pending-approvals-modal-content';
import RejectAllPendingApprovalsTransactionModalContent from './reject-all-pending-approvals-modal-content';
import RejectPendingApprovalsTransactionModalContent from './reject-pending-approvals-modal-content';

const TransactionsModalsContent:FC<IVendorsModalsContentProps> = (props:IVendorsModalsContentProps) => {
  const { approveType } = props;
  if (approveType === EApproveType.ApproveAll) {
    return <ApproveAllPendingApprovalsTransactionsModalContent {...props} />
  }

  if (approveType === EApproveType.RejectSelect) {
    return <RejectPendingApprovalsTransactionModalContent {...props} />
  }
  
  if (approveType === EApproveType.RejectAll) {
    return <RejectAllPendingApprovalsTransactionModalContent {...props} />
  }
  return <ApprovePendingApprovalsTransactionModalContent {...props} />
}

export default TransactionsModalsContent
