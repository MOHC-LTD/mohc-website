import { FunctionComponent, useEffect, useRef } from 'react'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, useTransform } from 'framer-motion'
import { Euler, Group } from 'three'

import { GLTFResult } from 'src/general/types'
import { useWindowDimensions } from 'src/general/utils/useWindowDimensions'

const isGithubActions = process.env.GITHUB_ACTIONS || false

const Phone3D: FunctionComponent = (props) => {
    const { nodes, materials } = useGLTF(
        isGithubActions
            ? 'https://github.com/MOHC-LTD/mohc-website/blob/gh-pages/jbc_iphone_hero-v2.glb'
            : '/jbc_iphone_hero-v2.glb'
    ) as GLTFResult

    // Keep track of deltas, smoothly interpolate using springs
    const x = useSpring(0.5, {
        damping: 12,
    })

    const y = useSpring(0.5, {
        damping: 12,
    })

    // Tweak the ranges of movement via the last array here
    const rotateX = useTransform(x, [0, 1], [-0.6, -0.4])

    const rotateY = useTransform(y, [0, 1], [0.3, 0.2])

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
            <group {...props} dispose={null} position={[5.1, -2, 0]} rotation={[2.8, -0.2, 3.1]}>
                <group position={[4.9, 2.12, 0.06]} rotation={[0, Math.PI / 2, 0]}>
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
                    position={[4.89, 3.42, 0.09]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials.pMetal}
                    position={[4.27, 2.58, 0.07]}
                    rotation={[0, -1.57, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={materials.pMetal}
                    position={[4.27, 2.81, 0.07]}
                    rotation={[0, -1.57, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials.pMetal}
                    position={[4.26, 3.04, 0.06]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={0.92}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube006.geometry}
                    material={materials.pMetal}
                    position={[5.53, 2.81, 0.07]}
                    rotation={[0, 1.57, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube007.geometry}
                    material={materials.metal}
                    position={[4.88, 0.93, 0.07]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[0.83, 1.71, 0.83]}
                />
                <group position={[4.93, 3.01, 0.01]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.01, 0, 0.01]}>
                    <mesh castShadow receiveShadow geometry={nodes.Cylinder010.geometry} material={materials.pMetal} />
                    <mesh castShadow receiveShadow geometry={nodes.Cylinder010_1.geometry} material={materials.Black} />
                </group>
                <group position={[4.9, 2.12, 0.06]} rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow receiveShadow geometry={nodes.Cube012.geometry} material={materials.p} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_1.geometry} material={materials.pMetal} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_2.geometry} material={materials.Black} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube012_3.geometry} material={materials.sm1} />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Tube_cap_top.geometry}
                    material={materials['Tube lid']}
                    position={[4.93, 1.75, 0.43]}
                    rotation={[-0.1, 0.17, 0.01]}
                    scale={0.33}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Tube_cap_base.geometry}
                    material={materials['Tube lid']}
                    position={[4.93, 1.64, 0.44]}
                    rotation={[-0.1, 0.17, 0.01]}
                    scale={0.33}
                />
                <group position={[4.92, 2.55, 0.33]} rotation={[-0.1, 0.17, 0.01]} scale={0.33}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder024.geometry}
                        material={materials['Tube base']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder024_1.geometry}
                        material={materials['Tube glossy.001']}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Marble_disc_bottom.geometry}
                    material={materials.Marble}
                    position={[5.65, 1.29, 0.37]}
                    rotation={[0, 0.17, 0.02]}
                    scale={0.86}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Marble_disc_top.geometry}
                    material={materials.Marble}
                    position={[4.29, 3.32, 0.38]}
                    rotation={[-0.25, 0, -0.12]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Screen.geometry}
                    material={materials['Screen JBC']}
                    position={[4.9, 2.12, 0.06]}
                    rotation={[0, Math.PI / 2, 0]}
                />
            </group>
        </group>
    )
}

useGLTF.preload(
    isGithubActions
        ? 'https://github.com/MOHC-LTD/mohc-website/blob/gh-pages/jbc_iphone_hero-v2.glb'
        : '/jbc_iphone_hero-v2.glb'
)

export default Phone3D
