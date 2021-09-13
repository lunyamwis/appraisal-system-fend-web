import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import AddNewCourse from '../course/addCourse'

export default function CourseModal() {
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
            <Modal.Header>Add A New Course</Modal.Header>
            <Modal.Content>
                <AddNewCourse/>
            </Modal.Content>
            
        </Modal>
    )
    
}
