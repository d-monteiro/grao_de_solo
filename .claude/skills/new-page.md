---
name: new-page
description: "Gera nova pagina com rota, proteccao e loading state. Usar quando pedirem para criar pagina ou view."
user_invocable: true
---

# Nova Pagina

Quando o user pedir para criar uma nova pagina, seguir estes passos:

## 1. Criar Ficheiro
`src/pages/<Nome>.tsx` (ou `src/pages/<area>/<Nome>.tsx` para admin/coach):

```tsx
import { useAuth } from "@/contexts/AuthContext";

export default function <Nome>() {
  const { profile } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Titulo</h1>

      {/* Conteudo */}
    </div>
  );
}
```

## 2. Adicionar Rota em App.tsx
```tsx
const <Nome> = lazy(() => import("@/pages/<Nome>"));

// Dentro de <Routes>:
<Route
  path="/<caminho>"
  element={
    <ProtectedRoute requireCourseAccess>
      <AppLayout>
        <<Nome> />
      </AppLayout>
    </ProtectedRoute>
  }
/>
```

## 3. Titulo no Header
Adicionar em `AppHeader.tsx` no `PAGE_TITLES`:
```tsx
"/<caminho>": "Titulo da Pagina",
```

## 4. Item na Sidebar (se necessario)
Adicionar em `AppSidebar.tsx` no `getNavItems()`:
```tsx
{ label: "Label", icon: IconName, path: "/<caminho>", locked: !hasCourseAccess },
```

## Regras
- Max 150 linhas
- Export default (para lazy import)
- Usar `useAuth()` para acesso condicionado
- Loading state com `<Loader2 className="animate-spin" />`
- Erro com toast: `import { toast } from "sonner"`
- Dados via service: `import { getXxx } from "@/services/xxx.service"`
