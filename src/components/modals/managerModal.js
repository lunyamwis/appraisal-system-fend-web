import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddNewEmployer from '../employer/addEmployer'

export default function EmployerModal() {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button icon floated='right'>
                <Icon name='plus square outline' />
            </Button>}
        >
            <Modal.Header>Add A New Employer</Modal.Header>
            <Modal.Content>
                <AddNewEmployer/>
            </Modal.Content>
            
        </Modal>
    )
    
}
