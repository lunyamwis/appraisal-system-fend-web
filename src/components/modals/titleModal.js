import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddNewTitle from '../title/addTitle'

export default function TitleModal() {
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
            <Modal.Header>Add A New Title</Modal.Header>
            <Modal.Content>
                <AddNewTitle/>
            </Modal.Content>
            
        </Modal>
    )
    
}
