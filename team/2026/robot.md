# FRC Team 8092 - 2026 Robot Development

> **Season**: FRC 2026 REBUILT (Presented by Qualcomm)
> **Team**: G.O.A.T. 8092 - Greatest of All Times
> **Competition**: Avrasya Regional (31 March - 2 April 2026)
> **Kickoff Date**: 10 January 2026

---

## 🤖 Current Robot Status (Pre-Kickoff - November 2025)

### Operational Status

**✅ OPERATIONAL**: Chassis and base drive system fully functional
**🔧 IN DEVELOPMENT**: Code improvements and driver training
**⏳ WAITING**: Kickoff game reveal for upper mechanism design

### Robot Configuration

#### Chassis: OPERATIONAL ✅

- **Drive Type**: Mecanum (4-wheel omnidirectional)
- **Motors**: 4x 2.5" CIM Motors (~5,330 RPM free speed)
- **Gearboxes**: 4x AndyMark Toughbox Mini Classic (12.75:1 reduction ratio)
- **Motor Controllers**: 4x VEX Pro Victor SPX (PWM mode)
- **Output Speed**: ~418 RPM at wheels
- **Status**: Fully tested and operational

#### Upper Mechanism: REMOVED ⚠️

- **Previous Configuration**: 2025 season lift system
- **Current Status**: Disassembled and removed from chassis
- **Reason**: Waiting for 2026 game reveal to design new mechanism
- **Components Stored**: Lift motors, pneumatics, and structural components from 2025 robot

#### Control & Vision Systems: OPERATIONAL ✅

- **Main Controller**: NI roboRIO 1.0 (10.80.92.4)
- **Gyroscope**: navX-MXP AHRS (9-axis IMU, MXP SPI port)
- **Vision**: Limelight 3 camera (10.80.92.200)
  - OV5647 color rolling shutter (640x480 @ 90 FPS)
  - AprilTag detection and tracking configured
  - Target tags: 12, 15
- **Networking**: Vivid-Hosting VH-109 FRC Radio (10.80.92.11)
- **Controllers**: 2x Logitech gamepads

---

## 🎯 Pre-Kickoff Development Focus (Until 10 January 2026)

### Primary Objectives

1. **Chassis Improvements**
   - Fine-tune mecanum drive performance
   - Optimize motor controller settings
   - Test and validate structural integrity
   - Ensure all drive components are competition-ready

2. **Code Optimization**
   - Refine field-oriented drive algorithms
   - Improve AprilTag alignment accuracy
   - Optimize PID controllers (rotation & drive)
   - Enhance driver control responsiveness
   - Test autonomous routines with current chassis

3. **Driver Training**
   - Practice mecanum drive maneuvers
   - Improve field-oriented driving skills
   - Train on vision-assisted alignment
   - Develop muscle memory for controls
   - Scrimmage practice sessions

4. **System Testing**
   - Validate all sensors and feedback systems
   - Test electrical connections and wiring
   - Ensure reliable communication between components
   - Battery performance testing
   - LED system integration (currently disabled)

---

## 🔧 Technical Specifications

### Drive System

- **Type**: Mecanum (omni-directional movement)
- **Max Speed**: 70% throttle (configurable)
- **Slew Rate**: 2.5 units/sec (X/Y), 2.0 units/sec (rotation)
- **Control Mode**: Field-oriented with gyro feedback
- **Weight Distribution**: Balanced for optimal traction

### Vision System

- **Target Distance Threshold**: 1.3% camera area
- **Max Drive Speed (Vision Mode)**: 0.4 (reduced for precision)
- **Max Rotation Speed (Vision Mode)**: 0.25
- **Rotation PID**: kP=0.03, kI=0.0, kD=0.006
- **Drive PID**: kP=0.1, kI=0.0, kD=0.005

### Software Stack

- **Framework**: WPILib Command-Based (2025.3.2)
- **Language**: Java 17
- **Architecture**: Subsystem-based with command scheduling
- **Features**:
  - Field-oriented drive
  - AprilTag-based alignment
  - Dual PID control systems
  - Exponential joystick curves
  - Multi-controller support (Xbox/Logitech)

---

## 📊 2025 vs 2026 Robot Comparison

### 2025 Robot (Previous Season)

- **Chassis**: Mecanum drive (same base as 2026)
- **Upper Mechanism**: Lift system for game pieces
- **Competition Record**: Participated in regional events
- **Status**: Upper mechanism retired, chassis retained

### 2026 Robot (Current Season)

- **Chassis**: Same proven mecanum base (operational)
- **Upper Mechanism**: TBD (waiting for game reveal on 10 January)
- **Improvements**: Enhanced code, refined tuning, better driver training
- **Competition**: Avrasya Regional (31 March - 2 April 2026)

---

## 🚫 Swerve Drive Upgrade - Decision Update

### Original Plan (Cancelled)

- **Objective**: Upgrade from mecanum to swerve drive system
- **Components Planned**:
  - 4+1 swerve modules: $6,185
  - 8x REV Spark MAX controllers: $1,800
  - Total: $7,985 for drive upgrade

### Decision: Cancelled Due to Budget Constraints ⚠️

**Reasoning**:

- Total budget shortfall: ~$8,310
- Entry fee gap: $1,300 (urgent priority)
- Materials budget insufficient for swerve upgrade
- SIEMENS funding (135,000 TRY) raised but not yet paid

**Outcome**:

- ✅ **Continue with mecanum drive** for 2026 season
- ✅ Existing mecanum system is operational and tested
- ✅ Team familiar with mecanum control and strategy
- ✅ Focus resources on entry fee and post-kickoff mechanism
- ✅ Proven chassis allows focus on code/driver improvements

**Advantages of Keeping Mecanum**:

- Zero additional cost
- Proven reliability
- Team expertise and experience
- Simpler maintenance
- Focus on new upper mechanism after kickoff

---

## 📅 Development Timeline

### Phase 1: Pre-Kickoff (Now - 10 January 2026)

- ✅ Chassis operational
- ✅ Code optimization ongoing
- ✅ Driver training in progress
- 🎯 All base systems competition-ready by kickoff

### Phase 2: Post-Kickoff (10 January - Early March 2026)

- Design new upper mechanism based on game rules
- Fabricate and assemble mechanism components
- Integrate new mechanism with existing chassis
- Program new subsystems and commands
- Test complete robot functionality
- **Build Season**: 6-7 weeks intensive development

### Phase 3: Pre-Competition (March 2026)

- Final robot assembly and integration
- Comprehensive testing and debugging
- Driver practice with complete robot
- Strategy development and autonomous programming
- Pit preparation and team readiness

### Phase 4: Competition (31 March - 2 April 2026)

- **Avrasya Regional** - 3 days
- Qualification matches
- Alliance selection
- Elimination rounds
- Potential advancement to Championship

---

## 🛠️ Code Repository

### Primary Repository

**Location**: `/Users/bugracanata/Developer/GOAT-robot-2026/`
**Repository**: FRC Team 8092 - 2026 Robot Code
**Language**: Java (WPILib Command-Based)

### Key Files

- `PARTS.md` - Complete hardware documentation and specifications
- `README.md` - Development setup and AI tools integration
- `SEASON-2026.md` - Detailed season information (referenced in repo)
- `src/main/java/frc/robot/` - Main robot code

### Documentation

- Comprehensive hardware component list
- Port assignments and network configuration
- Controller setup and button mappings
- Technical specifications for all systems
- AI-assisted development instructions (Claude Code, Copilot, etc.)

### Features in Current Code

- ✅ Mecanum drive implementation
- ✅ Field-oriented control with gyro
- ✅ AprilTag detection and alignment
- ✅ Dual PID control systems
- ✅ Smooth acceleration with slew rate limiting
- ✅ Exponential joystick curves
- ✅ Multi-controller support
- ⏸️ LED subsystem (present but disabled)

---

## 📋 Technical Priorities

### Hardware Priorities

1. ✅ Ensure all drive motors operational
2. ✅ Validate gyroscope calibration
3. ✅ Confirm Limelight 3 functionality
4. ✅ Test battery performance and charging
5. ⏳ Maintain electrical connections and wiring
6. ⏳ Prepare for upper mechanism integration post-kickoff

### Software Priorities

1. ✅ Refine field-oriented drive control
2. ✅ Optimize AprilTag alignment algorithms
3. ✅ Improve autonomous command reliability
4. ⏳ Prepare command framework for new mechanism
5. ⏳ Test and validate all subsystem interactions
6. ⏳ Document code for new team members

### Training Priorities

1. ✅ Driver proficiency with mecanum drive
2. ✅ Field-oriented driving practice
3. ✅ Vision-assisted alignment training
4. ⏳ Develop consistent driving patterns
5. ⏳ Practice rapid maneuvers and positioning
6. ⏳ Build teamwork and communication

---

## 🎓 Learning Outcomes

### Team Skills Development

**Mechanical Engineering**:

- Chassis maintenance and tuning
- Mecanum drive kinematics
- Component integration planning
- Post-kickoff: New mechanism design and fabrication

**Electrical Engineering**:

- Power distribution management
- Motor controller configuration
- Sensor integration and calibration
- Network configuration and troubleshooting

**Software Engineering**:

- Command-based robot programming
- PID control implementation
- Computer vision integration
- Autonomous routine development
- Code optimization and debugging

**Project Management**:

- Timeline planning and execution
- Budget constraint decision-making
- Resource allocation
- Team coordination and communication

---

## 📞 Technical Contacts

### Code Repository

- GitHub Organization: [GOAT-8092](https://github.com/GOAT-8092)
- Repository: 8092-robot-2026

### Team Leadership

- **Baş Mentor**: Hakan KÖSE (School Principal)
- **Programming Team**: [Student leads TBD]
- **Mechanical Team**: [Student leads TBD]
- **Electrical Team**: [Student leads TBD]

### External Resources

- **WPILib Documentation**: [docs.wpilib.org](https://docs.wpilib.org/)
- **Limelight Docs**: [docs.limelightvision.io](https://docs.limelightvision.io/tr/)
- **FRC Türkiye**: [frcturkiye.org](https://www.frcturkiye.org/)

---

## 🔄 Post-Kickoff Updates

This document will be updated after the 10 January 2026 kickoff event with:

- 2026 game rules and objectives
- Upper mechanism design concepts
- Updated development timeline
- New component requirements
- Strategy and autonomous plans

---

_Last Updated: 20 November 2025_

_For robot technical inquiries: Team 8092 Programming/Mechanical leads_

_Competition Info: Avrasya Regional - 31 March to 2 April 2026_
