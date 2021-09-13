import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddNewGrade from '../grade/addGrade'

export default function GradeModal() {
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
            <Modal.Header>Add A New Grade</Modal.Header>
            <Modal.Content>
                <AddNewGrade/>
            </Modal.Content>
            
        </Modal>
    )
    
}
