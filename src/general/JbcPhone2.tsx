import { FunctionComponent, useEffect, useRef } from 'react'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, useTransform } from 'framer-motion'
import { Euler, Group } from 'three'

import { GLTFResult } from 'src/general/types'
import { useWindowDimensions } from 'src/general/utils/useWindowDimensions'

const jbcPhone = new URL('assets/jbc_iphone_hero-v5.glb', import.meta.url).toString()

const JbcPhone2: FunctionComponent = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF(jbcPhone) as GLTFResult

    // Keep track of deltas, smoothly interpolate using springs
    const x = useSpring(0.5, {
        damping: 12,
    })

    const y = useSpring(0.5, {
        damping: 12,
    })

    // Tweak the ranges of movement via the last array here
    const rotateX = useTransform(x, [0, 1], [-0.5, -0.1])

    const rotateY = useTransform(y, [0, 1], [0.3, 0.1])

    const { width, height } = useWindowDimensions()

    // Update cursor position deltas
    useEffect(() => {
        const callback = (event: MouseEvent): void => {
            x.set(event.clientX / width)

            y.set(event.clientY / height)
        }

        window.addEventListener('mousemove', callback)

        return (): void => window.removeEventListener('mousemove', callback)
    }, [x, y, width, height])

    const ref = useRef<Group>(null)

    // Update rotation on every frame
    useFrame(() => {
        if (!ref.current) {
            return
        }

        const rotation = new Euler(rotateY.get(), Math.PI + rotateX.get(), 0, 'YXZ')

        ref.current.setRotationFromEuler(rotation)
    })

    return (
        <group ref={ref}>
            <group {...props} dispose={null} position={[4.3, -2.6, -2.2]} rotation={[-0.2, 3.2, 0]}>
                <group position={[4.896, 2.116, 0.06]} rotation={[0, 1.571, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004_1.geometry}
                        material={nodes.Cube004_1.material}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004_2.geometry}
                        material={materials['Material.002']}
                    />
                    <mesh castShadow receiveShadow geometry={nodes.Cube004_3.geometry} material={materials.metal} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube004_4.geometry} material={materials.sm1} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube004_5.geometry} material={materials.speakers} />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.Black}
                    position={[4.894, 3.42, 0.09]}
                    rotation={[0, 1.571, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials.pMetal}
                    position={[4.268, 2.576, 0.07]}
                    rotation={[0, -1.571, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={materials.pMetal}
                    position={[4.268, 2.812, 0.07]}
                    rotation={[0, -1.571, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials.pMetal}
                    position={[4.262, 3.038, 0.063]}
                    rotation={[0, 1.571, 0]}
                    scale={0.923}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={materials.pMetal}
                    position={[5.53, 2.812, 0.07]}
                    rotation={[0, 1.571, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007.geometry}
                    material={materials.metal}
                    position={[4.884, 0.929, 0.07]}
                    rotation={[0, 1.571, 0]}
                    scale={[0.831, 1.706, 0.831]}
                />
                <group
                    position={[4.926, 3.006, 0.01]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[0.007, 0.002, 0.007]}
                >
                    <mesh castShadow receiveShadow geometry={nodes.Cylinder010.geometry} material={materials.pMetal} />
                    <mesh castShadow receiveShadow geometry={nodes.Cylinder010_1.geometry} material={materials.Black} />
                </group>
                <group position={[4.896, 2.116, 0.06]} rotation={[0, 1.571, 0]}>
                    <mesh castShadow receiveShadow geometry={nodes.Cube012.geometry} material={materials.p} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_1.geometry} material={materials.pMetal} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_2.geometry} material={materials.Black} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_3.geometry} material={materials.sm1} />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Screen.geometry}
                    material={materials['Screen JBC']}
                    position={[4.896, 2.116, 0.06]}
                    rotation={[0, 1.571, 0]}
                />
            </group>
        </group>
    )
}

useGLTF.preload(jbcPhone)

export default JbcPhone2
