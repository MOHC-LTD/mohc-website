import { FunctionComponent, lazy, Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

const Phone3D = lazy(() => import('src/general/Phone3D'))

const PhoneCanvas: FunctionComponent = () => {
    return (
        <Suspense fallback={null}>
            <Canvas
                camera={{
                    zoom: 2.2,
                }}
                style={{
                    height: '600px',
                    width: '380px',
                    margin: '-24px',
                }}
            >
                <ambientLight />
                <Phone3D />
            </Canvas>
        </Suspense>
    )
}

export default PhoneCanvas
