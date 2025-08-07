# Build Plan: Next-Gen Car Simulator

This document outlines the development plan to evolve the existing 2D car race game into a 3D car simulator with realistic physics and graphics.

## Phase 1: Foundational Architectural Shift

The goal of this phase is to replace the core rendering and physics systems. This is the most significant change and will set the stage for all future development.

1.  **Integrate a 3D Rendering Engine:**
    *   **Action:** Transition from DOM-based rendering to a WebGL-based approach using a `<canvas>`.
    *   **Technology:** Use `react-three-fiber` as the React renderer for Three.js. This allows us to build a 3D scene declaratively with React components.
    *   **Tasks:**
        *   Install dependencies: `pnpm add three @react-three/fiber`.
        *   Replace the current game component with a `react-three-fiber` `<Canvas>` component.
        *   Create a basic 3D scene with a floor and a light source.

2.  **Integrate a Physics Engine:**
    *   **Action:** Introduce a real-time physics engine to handle movement, collision, and forces.
    *   **Technology:** Use `@react-three/rapier`, a powerful physics engine with excellent `react-three-fiber` integration.
    *   **Tasks:**
        *   Install dependencies: `pnpm add @react-three/rapier`.
        *   Wrap the 3D scene with the `<Physics>` component from `@react-three/rapier`.
        *   Replace the static floor with a `RigidBody` to create a physical ground plane.

3.  **Create a Basic Physics-Based "Car":**
    *   **Action:** Create a simple 3D object that represents the player's vehicle and is controlled by the physics engine.
    *   **Tasks:**
        *   Create a new component, e.g., `Vehicle.tsx`.
        *   Inside `Vehicle.tsx`, define a `RigidBody` with a 3D mesh (e.g., a simple box).
        *   Update the input handling (arrow keys) to apply forces and torque to the `RigidBody` instead of changing coordinates directly.

## Phase 2: Core Simulator Features

With the new architecture in place, this phase focuses on building the core features of the simulator.

1.  **Develop a Realistic Vehicle Model:**
    *   **Action:** Move from a simple box to a more complex and realistic vehicle.
    *   **Tasks:**
        *   Import a 3D model for the car (e.g., in `.glb` format).
        *   Use `@react-three/drei` to easily load the model.
        *   Implement a raycast-based vehicle controller using the physics engine for more realistic suspension and tire grip. This involves creating "wheels" that interact with the ground.
        *   Tune physics parameters like mass, friction, restitution, and suspension stiffness.

2.  **Build the Environment:**
    *   **Action:** Create a 3D track or environment for the car to drive in.
    *   **Tasks:**
        *   Model a simple race track or use a pre-existing 3D model.
        *   Implement collision geometry for the track so the car can interact with it.
        *   Add environmental props like barriers, trees, and buildings.

3.  **Enhance Controls:**
    *   **Action:** Improve the input system for more nuanced control.
    *   **Tasks:**
        *   Integrate a library like `use-gamepads` to add support for analog input from game controllers.
        *   Map analog stick inputs to steering and throttle for finer control.

## Phase 3: Polish and Expansion

This phase focuses on improving the user experience and adding more gameplay content.

1.  **Develop the Heads-Up Display (HUD):**
    *   **Action:** Create an in-game UI to display critical information.
    *   **Technology:** Use `@react-three/drei`'s `<Html>` component to overlay traditional HTML UI on top of the 3D scene.
    *   **Tasks:**
        *   Design and implement a HUD to show speed, RPM, current gear, and lap times.

2.  **Improve Graphics and Audio:**
    *   **Action:** Enhance the visual and auditory feedback.
    *   **Tasks:**
        *   Add realistic lighting, shadows, and post-processing effects (e.g., bloom, motion blur).
        *   Implement engine sounds that change based on RPM.
        *   Add tire screeching and collision sound effects.

3.  **Implement Game Logic:**
    *   **Action:** Build out the game rules and objectives.
    *   **Tasks:**
        *   Create a lap timing and checkpoint system.
        *   Implement game states (e.g., pre-race countdown, race, post-race results).
        *   (Optional) Develop basic AI for opponent vehicles.