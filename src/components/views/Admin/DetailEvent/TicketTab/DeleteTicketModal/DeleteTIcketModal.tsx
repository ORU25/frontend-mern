import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/TIcket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refecthTicket: () => void;
  onOpenChange: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    refecthTicket,
    onOpenChange,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket){
        onClose();
        refecthTicket();
        setSelectedDataTicket(null);
    }
  }, [isSuccessMutateDeleteTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Are you sure you want to delete this ticket?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null);
            }}
            disabled={isPendingMutateDeleteTicket}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTicket}
            onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
          >
            {isPendingMutateDeleteTicket ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
