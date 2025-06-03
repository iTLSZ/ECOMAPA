"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Sparkles,
  Heart,
  Shield,
  Users,
  Building2,
  DollarSign,
  FileText,
  TreePine,
  Accessibility,
  Landmark,
  MapPin,
  Globe,
  GraduationCap,
} from "lucide-react"

interface Actor {
  id: string
  nombre: string
  apoyo: string[]
  nivel: "micro" | "meso" | "macro"
  relacion: "fuerte" | "debil" | "barrera"
  x: number
  y: number
  radio: number
  icon: any
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function EcomapaElegante() {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [hoveredActor, setHoveredActor] = useState<Actor | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [animationFrame, setAnimationFrame] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const centerX = 400
  const centerY = 300

  // Generar partículas sutiles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 800,
          y: Math.random() * 600,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: Math.random() * 100,
          maxLife: 100,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()

    const animate = () => {
      setAnimationFrame((prev) => prev + 1)
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life > 0 ? particle.life - 0.5 : particle.maxLife,
          vx: particle.x > 800 || particle.x < 0 ? -particle.vx : particle.vx,
          vy: particle.y > 600 || particle.y < 0 ? -particle.vy : particle.vy,
        })),
      )
    }

    const interval = setInterval(animate, 80)
    return () => clearInterval(interval)
  }, [])

  const actores: Actor[] = [
    // Nivel Micro
    {
      id: "centros-salud",
      nombre: "Centros de Salud",
      apoyo: ["Campañas de prevención", "Atención primaria", "Promoción de salud"],
      nivel: "micro",
      relacion: "fuerte",
      x: centerX - 180,
      y: centerY - 120,
      radio: 40,
      icon: Heart,
    },
    {
      id: "policia-cai",
      nombre: "Policía - CAI",
      apoyo: ["Programas de seguridad", "Vigilancia comunitaria", "Prevención del delito"],
      nivel: "micro",
      relacion: "fuerte",
      x: centerX + 180,
      y: centerY - 120,
      radio: 40,
      icon: Shield,
    },
    {
      id: "lideres-comunitarios",
      nombre: "Líderes Comunitarios",
      apoyo: ["Integración comunitaria", "Movilización social", "Representación"],
      nivel: "micro",
      relacion: "fuerte",
      x: centerX,
      y: centerY - 200,
      radio: 45,
      icon: Users,
    },
    // Nivel Meso
    {
      id: "secretaria-gobierno",
      nombre: "Secretaría de Gobierno",
      apoyo: ["Programas culturales", "Programas deportivos", "Apoyo institucional"],
      nivel: "meso",
      relacion: "fuerte",
      x: centerX - 250,
      y: centerY + 80,
      radio: 50,
      icon: Building2,
    },
    {
      id: "fundacion-mundo-mujer",
      nombre: "Fundación Mundo Mujer",
      apoyo: ["Educación financiera", "Proyectos productivos", "Microcréditos"],
      nivel: "meso",
      relacion: "fuerte",
      x: centerX + 250,
      y: centerY + 80,
      radio: 50,
      icon: DollarSign,
    },
    {
      id: "comites-piscc",
      nombre: "Comité PISCC",
      apoyo: ["Seguridad ciudadana", "Prevención de violencia"],
      nivel: "meso",
      relacion: "debil",
      x: centerX - 200,
      y: centerY + 180,
      radio: 35,
      icon: FileText,
    },
    {
      id: "comites-cidea",
      nombre: "Comité CIDEA",
      apoyo: ["Sostenibilidad ambiental", "Educación ecológica"],
      nivel: "meso",
      relacion: "debil",
      x: centerX,
      y: centerY + 220,
      radio: 35,
      icon: TreePine,
    },
    {
      id: "comites-discapacidad",
      nombre: "Comités de Discapacidad",
      apoyo: ["Inclusión social", "Accesibilidad", "Derechos"],
      nivel: "meso",
      relacion: "fuerte",
      x: centerX + 200,
      y: centerY + 180,
      radio: 40,
      icon: Accessibility,
    },
    // Nivel Macro
    {
      id: "ministerio-interior",
      nombre: "Ministerio del Interior",
      apoyo: ["Asistencia técnica", "Políticas públicas"],
      nivel: "macro",
      relacion: "barrera",
      x: centerX - 320,
      y: centerY - 80,
      radio: 55,
      icon: Landmark,
    },
    {
      id: "secretaria-planeacion",
      nombre: "Secretaría de Planeación",
      apoyo: ["Planificación participativa", "Desarrollo territorial"],
      nivel: "macro",
      relacion: "fuerte",
      x: centerX + 320,
      y: centerY - 80,
      radio: 55,
      icon: MapPin,
    },
    {
      id: "pnud",
      nombre: "PNUD",
      apoyo: ["Gobernanza local", "Cooperación internacional"],
      nivel: "macro",
      relacion: "fuerte",
      x: centerX - 280,
      y: centerY + 250,
      radio: 50,
      icon: Globe,
    },
    {
      id: "fondo-multidonante",
      nombre: "Fondo Multidonante ONU",
      apoyo: ["Cohesión social", "Financiación de proyectos"],
      nivel: "macro",
      relacion: "fuerte",
      x: centerX + 280,
      y: centerY + 250,
      radio: 50,
      icon: DollarSign,
    },
    {
      id: "centro-desarrollo-rural",
      nombre: "Centro Desarrollo Rural",
      apoyo: ["Políticas públicas rurales", "Desarrollo sostenible"],
      nivel: "macro",
      relacion: "debil",
      x: centerX,
      y: centerY + 320,
      radio: 45,
      icon: GraduationCap,
    },
  ]

  const getNivelGradient = (nivel: string) => {
    switch (nivel) {
      case "micro":
        return "url(#gradientMicro)"
      case "meso":
        return "url(#gradientMeso)"
      case "macro":
        return "url(#gradientMacro)"
      default:
        return "#E5E7EB"
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "micro":
        return "#3B82F6" // Azul suave
      case "meso":
        return "#10B981" // Verde esmeralda suave
      case "macro":
        return "#EF4444" // Rojo coral suave
      default:
        return "#6B7280"
    }
  }

  const getLineStyle = (relacion: string) => {
    switch (relacion) {
      case "fuerte":
        return { strokeDasharray: "none", stroke: "#4B5563", strokeWidth: "2.5" }
      case "debil":
        return { strokeDasharray: "8,4", stroke: "#9CA3AF", strokeWidth: "2" }
      case "barrera":
        return { strokeDasharray: "4,4,2,4", stroke: "#DC2626", strokeWidth: "2" }
      default:
        return { strokeDasharray: "none", stroke: "#6B7280", strokeWidth: "2" }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setSelectedActor(null)
    setHoveredActor(null)
  }

  // Función para crear líneas curvas que eviten el texto
  const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
    const dx = endX - startX
    const dy = endY - startY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Crear una curva que se aleje del centro para evitar el texto
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2

    // Calcular el punto de control para la curva
    const perpX = -dy / distance
    const perpY = dx / distance

    // Ajustar la curvatura basada en la distancia
    const curvature = Math.min(distance * 0.2, 80)
    const controlX = midX + perpX * curvature
    const controlY = midY + perpY * curvature

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
  }

  const renderConnection = (actor: Actor) => {
    const lineStyle = getLineStyle(actor.relacion)
    const dx = actor.x - centerX
    const dy = actor.y - centerY
    const length = Math.sqrt(dx * dx + dy * dy)
    const unitX = dx / length
    const unitY = dy / length

    const startX = centerX + unitX * 70
    const startY = centerY + unitY * 70
    const endX = actor.x - unitX * actor.radio
    const endY = actor.y - unitY * actor.radio

    const isActive = hoveredActor?.id === actor.id || selectedActor?.id === actor.id
    const pathData = createCurvedPath(startX, startY, endX, endY)

    // Calcular punto para la etiqueta en la curva
    const t = 0.6 // Posición en la curva (60%)
    const labelX = startX + (endX - startX) * t + (dx > 0 ? 20 : -20)
    const labelY = startY + (endY - startY) * t - 15

    return (
      <g key={`connection-${actor.id}`} className={isActive ? "opacity-100" : "opacity-70"}>
        <path
          d={pathData}
          fill="none"
          stroke={lineStyle.stroke}
          strokeWidth={isActive ? "3" : lineStyle.strokeWidth}
          strokeDasharray={lineStyle.strokeDasharray}
          markerEnd="url(#arrowhead)"
          className="transition-all duration-300"
        />

        {/* Punto indicador en la línea */}
        <circle
          cx={labelX - (dx > 0 ? 20 : -20)}
          cy={labelY + 15}
          r="2"
          fill={getNivelColor(actor.nivel)}
          className={`transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
        >
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Etiqueta de apoyo con fondo */}
        <rect
          x={labelX - 35}
          y={labelY - 8}
          width="70"
          height="16"
          rx="8"
          fill="white"
          stroke={getNivelColor(actor.nivel)}
          strokeWidth="1"
          opacity={isActive ? "0.95" : "0.85"}
          className="transition-all duration-300"
        />
        <text
          x={labelX}
          y={labelY + 3}
          textAnchor="middle"
          fontSize="9"
          fill="#374151"
          fontWeight="500"
          className={`pointer-events-none transition-all duration-300 ${isActive ? "opacity-100" : "opacity-80"}`}
        >
          {actor.apoyo[0].length > 12 ? actor.apoyo[0].substring(0, 12) + "..." : actor.apoyo[0]}
        </text>
      </g>
    )
  }

  const renderActor = (actor: Actor) => {
    const IconComponent = actor.icon
    const isActive = hoveredActor?.id === actor.id || selectedActor?.id === actor.id
    const scale = isActive ? 1.05 : 1

    return (
      <g key={actor.id} className="transition-all duration-300">
        {/* Sombra sutil */}
        <circle
          cx={actor.x + 2}
          cy={actor.y + 2}
          r={actor.radio}
          fill="#000000"
          opacity="0.1"
          className="transition-all duration-300"
        />

        {/* Círculo principal */}
        <circle
          cx={actor.x}
          cy={actor.y}
          r={actor.radio}
          fill={getNivelGradient(actor.nivel)}
          stroke={getNivelColor(actor.nivel)}
          strokeWidth={isActive ? "3" : "2"}
          className="cursor-pointer transition-all duration-300 hover:stroke-3"
          onClick={() => setSelectedActor(actor)}
          onMouseEnter={() => setHoveredActor(actor)}
          onMouseLeave={() => setHoveredActor(null)}
          transform={`scale(${scale})`}
          transformOrigin={`${actor.x} ${actor.y}`}
          filter={isActive ? "url(#softGlow)" : "none"}
        />

        {/* Icono */}
        <foreignObject x={actor.x - 12} y={actor.y - 25} width="24" height="24" className="pointer-events-none">
          <IconComponent
            className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? "drop-shadow-md" : ""}`}
          />
        </foreignObject>

        {/* Texto con fondo para mejor legibilidad */}
        <rect
          x={actor.x - 45}
          y={actor.y + 8}
          width="90"
          height="24"
          rx="12"
          fill="white"
          stroke={getNivelColor(actor.nivel)}
          strokeWidth="1"
          opacity="0.9"
          className="pointer-events-none"
        />
        <text
          x={actor.x}
          y={actor.y + 15}
          textAnchor="middle"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
          fill="#374151"
          className="pointer-events-none"
        >
          <tspan x={actor.x} dy="0">
            {actor.nombre.split(" ")[0]}
          </tspan>
          <tspan x={actor.x} dy="10">
            {actor.nombre.split(" ").slice(1, 3).join(" ")}
          </tspan>
        </text>

        {/* Indicadores sutiles alrededor del actor activo */}
        {isActive && (
          <g>
            {[...Array(4)].map((_, i) => (
              <circle
                key={i}
                cx={actor.x + Math.cos((animationFrame + i * 90) * 0.02) * (actor.radio + 15)}
                cy={actor.y + Math.sin((animationFrame + i * 90) * 0.02) * (actor.radio + 15)}
                r="3"
                fill={getNivelColor(actor.nivel)}
                opacity="0.6"
              >
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="text-center mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 blur-3xl"></div>
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-500" />
              Ecomapa Interactivo - JAC Popayán
              <Sparkles className="w-8 h-8 text-amber-500" />
            </h1>
            <p className="text-gray-600 text-lg">Relaciones Interinstitucionales • Tejido Comunitario en Acción</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                  <Info className="w-5 h-5 text-blue-500" />
                  Controles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={handleZoomIn}
                    size="sm"
                    variant="outline"
                    className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleZoomOut}
                    size="sm"
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleReset}
                    size="sm"
                    variant="outline"
                    className="bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Arrastra para mover
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Haz clic en los nodos
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Usa los controles de zoom
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Leyenda */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-700">Leyenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-600">Nivel Micro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-600">Nivel Meso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-600">Nivel Macro</span>
                  </div>
                </div>
                <hr className="border-gray-300" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0 border-t-2 border-gray-600"></div>
                    <span className="text-sm text-gray-600">Relación Fuerte</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0 border-t-2 border-dashed border-gray-400"></div>
                    <span className="text-sm text-gray-600">Relación Débil</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0 border-t-2 border-dotted border-red-500"></div>
                    <span className="text-sm text-gray-600">Barreras</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información del Actor Seleccionado */}
            {selectedActor && (
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-700 flex items-center gap-2">
                    <selectedActor.icon className="w-5 h-5 text-blue-500" />
                    {selectedActor.nombre}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit border-gray-300 text-gray-600">
                    Nivel {selectedActor.nivel.charAt(0).toUpperCase() + selectedActor.nivel.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-600">Tipos de Apoyo:</h4>
                    <ul className="text-sm space-y-2">
                      {selectedActor.apoyo.map((apoyo, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="text-blue-500 text-lg">•</span>
                          {apoyo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Ecomapa SVG */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] overflow-hidden bg-white/60 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardContent className="p-0 h-full relative">
                {/* Partículas de fondo sutiles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-20"
                      style={{
                        left: `${(particle.x / 800) * 100}%`,
                        top: `${(particle.y / 600) * 100}%`,
                        opacity: (particle.life / particle.maxLife) * 0.2,
                      }}
                    />
                  ))}
                </div>

                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 600"
                  className="cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <defs>
                    {/* Gradientes suaves */}
                    <radialGradient id="gradientMicro" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#DBEAFE" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </radialGradient>
                    <radialGradient id="gradientMeso" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D1FAE5" />
                      <stop offset="100%" stopColor="#10B981" />
                    </radialGradient>
                    <radialGradient id="gradientMacro" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FEE2E2" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </radialGradient>
                    <radialGradient id="centralGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F8FAFC" />
                      <stop offset="50%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#1E1B4B" />
                    </radialGradient>

                    {/* Filtros suaves */}
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Marcador de flecha */}
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                    </marker>
                  </defs>

                  <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                    {/* Conexiones curvas */}
                    {actores.map((actor) => renderConnection(actor))}

                    {/* JAC Central */}
                    <g>
                      {/* Anillo sutil */}
                      <circle
                        cx={centerX}
                        cy={centerY}
                        r="85"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                        opacity="0.5"
                      >
                        <animate attributeName="r" values="85;90;85" dur="6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="6s" repeatCount="indefinite" />
                      </circle>

                      {/* Círculo principal */}
                      <circle
                        cx={centerX}
                        cy={centerY}
                        r="70"
                        fill="url(#centralGradient)"
                        stroke="#4F46E5"
                        strokeWidth="3"
                        filter="url(#softGlow)"
                      />

                      {/* Icono central */}
                      <foreignObject x={centerX - 15} y={centerY - 35} width="30" height="30">
                        <Users className="w-8 h-8 text-white drop-shadow-md" />
                      </foreignObject>

                      {/* Texto central */}
                      <text
                        x={centerX}
                        y={centerY + 5}
                        textAnchor="middle"
                        fontSize="18"
                        fontWeight="bold"
                        fill="white"
                        fontFamily="sans-serif"
                        className="drop-shadow-md"
                      >
                        JAC
                      </text>
                      <text
                        x={centerX}
                        y={centerY + 25}
                        textAnchor="middle"
                        fontSize="18"
                        fontWeight="bold"
                        fill="white"
                        fontFamily="sans-serif"
                        className="drop-shadow-md"
                      >
                        Popayán
                      </text>
                    </g>

                    {/* Actores */}
                    {actores.map((actor) => renderActor(actor))}
                  </g>
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
