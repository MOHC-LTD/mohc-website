import { FunctionComponent, lazy, PropsWithChildren, Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

const JbcPhone2 = lazy(() => import('src/general/JbcPhone2'))

interface PhoneCanvasProps {
    lg?: boolean
}

const PhoneCanvas: FunctionComponent<PropsWithChildren<PhoneCanvasProps>> = ({ lg }) => {
    return (
        <Canvas
            camera={{
                zoom: 1,
            }}
            style={{
                height: lg ? '800px' : '600px',
                width: lg ? '500px' : '360px',
                margin: '-24px',
            }}
        >
            <Suspense fallback={null}>
                <ambientLight />
                <JbcPhone2 />
            </Suspense>
        </Canvas>
    )
}

export default PhoneCanvas
