"use client"
import {
  Building2,
  Users,
  Shield,
  Heart,
  Landmark,
  Globe,
  TreePine,
  GraduationCap,
  Accessibility,
  MapPin,
  DollarSign,
  FileText,
  ArrowRight,
  ArrowLeftRight,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const EcomapaProfesional = () => {
  const actores = {
    micro: [
      { nombre: "Centros de Salud", icono: Heart, apoyo: "Campañas de salud", relacion: "fuerte" },
      { nombre: "Policía (CAI)", icono: Shield, apoyo: "Seguridad comunitaria", relacion: "fuerte" },
      { nombre: "Líderes Comunitarios", icono: Users, apoyo: "Liderazgo y movilización", relacion: "bidireccional" },
    ],
    meso: [
      {
        nombre: "Secretaría de Gobierno Municipal",
        icono: Building2,
        apoyo: "Apoyo institucional",
        relacion: "fuerte",
      },
      {
        nombre: "Fundación Mundo Mujer",
        icono: DollarSign,
        apoyo: "Microcréditos y proyectos productivos",
        relacion: "bidireccional",
      },
      { nombre: "Comité PISCC", icono: FileText, apoyo: "Participación limitada", relacion: "debil" },
      { nombre: "Comité CIDEA", icono: TreePine, apoyo: "Educación ambiental", relacion: "debil" },
      { nombre: "Comités de Discapacidad", icono: Accessibility, apoyo: "Inclusión social", relacion: "bidireccional" },
    ],
    macro: [
      { nombre: "Ministerio del Interior", icono: Landmark, apoyo: "Políticas públicas", relacion: "barrera" },
      {
        nombre: "Secretaría de Planeación Municipal",
        icono: MapPin,
        apoyo: "Planeación territorial",
        relacion: "fuerte",
      },
      { nombre: "PNUD", icono: Globe, apoyo: "Cooperación internacional", relacion: "fuerte" },
      {
        nombre: "Fondo Multidonante de la ONU",
        icono: DollarSign,
        apoyo: "Financiación de proyectos",
        relacion: "fuerte",
      },
      {
        nombre: "Centro Latinoamericano para el Desarrollo Rural",
        icono: GraduationCap,
        apoyo: "Desarrollo rural",
        relacion: "debil",
      },
    ],
  }

  const getRelacionColor = (tipo: string) => {
    switch (tipo) {
      case "fuerte":
        return "border-emerald-400 bg-emerald-50 text-emerald-700"
      case "debil":
        return "border-amber-400 bg-amber-50 text-amber-700"
      case "bidireccional":
        return "border-blue-400 bg-blue-50 text-blue-700"
      case "barrera":
        return "border-red-400 bg-red-50 text-red-700"
      default:
        return "border-gray-300 bg-gray-50 text-gray-700"
    }
  }

  const getRelacionIcon = (tipo: string) => {
    switch (tipo) {
      case "fuerte":
        return <ArrowRight className="w-4 h-4" />
      case "debil":
        return <div className="w-4 h-4 border-t-2 border-dashed border-current"></div>
      case "bidireccional":
        return <ArrowLeftRight className="w-4 h-4" />
      case "barrera":
        return <Zap className="w-4 h-4" />
      default:
        return <ArrowRight className="w-4 h-4" />
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "micro":
        return "from-blue-500 to-blue-600"
      case "meso":
        return "from-emerald-500 to-emerald-600"
      case "macro":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const renderActor = (actor: any, nivel: string) => {
    const IconComponent = actor.icono
    return (
      <Card
        key={actor.nombre}
        className={`relative transition-all duration-300 hover:shadow-lg hover:scale-105 ${getRelacionColor(actor.relacion)} border-2`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getNivelColor(nivel)}`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-sm font-semibold leading-tight">{actor.nombre}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 mb-2">{actor.apoyo}</p>
          <div className="flex items-center gap-1">
            {getRelacionIcon(actor.relacion)}
            <Badge variant="outline" className="text-xs">
              {actor.relacion === "fuerte"
                ? "Fuerte"
                : actor.relacion === "debil"
                  ? "Débil"
                  : actor.relacion === "bidireccional"
                    ? "Bidireccional"
                    : "Barrera"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Ecomapa de las JAC de Popayán</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Relaciones entre las Juntas de Acción Comunal y los actores institucionales en los niveles micro, meso y
            macro según el trabajo "Tejido Comunitario en Acción"
          </p>
        </div>

        {/* JAC Central */}
        <div className="flex justify-center mb-12">
          <Card className="w-80 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-white/20 rounded-full w-16 h-16 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold">JAC Popayán</CardTitle>
              <p className="text-indigo-100">Juntas de Acción Comunal</p>
            </CardHeader>
          </Card>
        </div>

        {/* Niveles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nivel Micro */}
          <div className="space-y-4">
            <div className="text-center">
              <h2
                className={`text-2xl font-bold text-white py-3 px-6 rounded-lg bg-gradient-to-r ${getNivelColor("micro")} inline-block`}
              >
                Nivel Micro
              </h2>
              <p className="text-sm text-gray-600 mt-2">Actores locales con interacción directa</p>
            </div>
            <div className="space-y-4">{actores.micro.map((actor) => renderActor(actor, "micro"))}</div>
          </div>

          {/* Nivel Meso */}
          <div className="space-y-4">
            <div className="text-center">
              <h2
                className={`text-2xl font-bold text-white py-3 px-6 rounded-lg bg-gradient-to-r ${getNivelColor("meso")} inline-block`}
              >
                Nivel Meso
              </h2>
              <p className="text-sm text-gray-600 mt-2">Instituciones municipales e intermedias</p>
            </div>
            <div className="space-y-4">{actores.meso.map((actor) => renderActor(actor, "meso"))}</div>
          </div>

          {/* Nivel Macro */}
          <div className="space-y-4">
            <div className="text-center">
              <h2
                className={`text-2xl font-bold text-white py-3 px-6 rounded-lg bg-gradient-to-r ${getNivelColor("macro")} inline-block`}
              >
                Nivel Macro
              </h2>
              <p className="text-sm text-gray-600 mt-2">Entidades nacionales e internacionales</p>
            </div>
            <div className="space-y-4">{actores.macro.map((actor) => renderActor(actor, "macro"))}</div>
          </div>
        </div>

        {/* Leyenda */}
        <Card className="mt-12 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Leyenda de Relaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm">Relación Fuerte</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-t-2 border-dashed border-amber-600"></div>
                <span className="text-sm">Relación Débil</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Bidireccional</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="text-sm">Barreras</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Basado en el trabajo "Tejido Comunitario en Acción" - Análisis de relaciones institucionales
          </p>
        </div>
      </div>
    </div>
  )
}

export default EcomapaProfesional
