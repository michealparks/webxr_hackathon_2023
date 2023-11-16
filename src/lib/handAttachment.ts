import { Object3D } from 'three';

const ATTACHMENT_JOINT = 'pinky-finger-metacarpal';

export class HandAttachment {

    constructor(handGroups) {

        this.isConnected = false;

        this.attachedObjects = [];

        this.handGroups = handGroups;

        this.groupsHandedness = {};

        this.handGroups.forEach(handGroup => {

            handGroup.addEventListener('connected', (event) => {

                this.isConnected = true;

                const xrInputSource = event.data;
                if (xrInputSource.hand) {
                    this.groupsHandedness[xrInputSource.handedness] = handGroup;
                    this.attachedObjects.forEach(attachedObject => {
                        console.log("here");
                        if (attachedObject.handedness === xrInputSource.handedness) {
                            console.log("left");
                            attachedObject.isAttached = this.attach(attachedObject.object3D, attachedObject.joint, attachedObject.handedness);

                        }


                    });
                }

            });

            // TODO disconnected never triggered?
            // seach for lost tracking event webxrinputsource

            handGroup.addEventListener('disconnected', () => {

                this.isConnected = false;

                // TODO detach necessary?
                this.attachedObjects.forEach(attachedObject => {

                    attachedObject.isAttached = false

                });

            });

        });

    }

    attachObjectToJoint(object, joint, handedness) {

        // if connected immediately attach
        let result = false;
        if (this.connected) result = this.attach(object, joint, handedness);

        // in either case maintain an array
        this.attachedObjects.push(
            new AttachedObject(object, joint, handedness, result || this.connected)
        );

    }

    attach(object, joint, handedness) {
        const attachmentJoint = this.groupsHandedness[handedness].joints[joint];

        // Issue here! Joints are not populated when controller connected
        // Joints populated only in the next controller update
        // Somehow wait till joints populated with object3d 
        // Or initialize inside some update loop - performance?

        if (attachmentJoint) {

            // Issue: Code doesn't reach this when called after controller connected!
            console.log(attachmentJoint);
            attachmentJoint.attach(object);
            return true;

        }

        return false;

    }

}



class AttachedObject {

    constructor(object3D, joint, handedness, isAttached = false) {

        this.object3D = object3D;
        this.joint = joint;
        this.handedness = handedness;
        this.isAttached = isAttached;

    }

}
