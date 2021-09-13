import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddNewDepartment from '../departments/addDepartment'

export default function DepartmentModal() {
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
            <Modal.Header>Add A New Department</Modal.Header>
            <Modal.Content>
                <AddNewDepartment/>
            </Modal.Content>
            
        </Modal>
    )
    
}
