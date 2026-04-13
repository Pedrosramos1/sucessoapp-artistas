import { useState } from "react";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const presets = [
  { label: "Hoje", range: () => ({ from: new Date(), to: new Date() }) },
  { label: "Ontem", range: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
  { label: "Últimos 7 dias", range: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { label: "Últimos 14 dias", range: () => ({ from: subDays(new Date(), 13), to: new Date() }) },
  { label: "Últimos 30 dias", range: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { label: "Esta semana", range: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) }) },
  { label: "Semana passada", range: () => ({ from: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }), to: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }) }) },
  { label: "Este mês", range: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: "Mês passado", range: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: "Máximo", range: () => ({ from: undefined, to: undefined }) },
];

const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePreset = (preset: typeof presets[0]) => {
    const r = preset.range();
    setActivePreset(preset.label);
    onChange(r);
    if (preset.label === "Máximo") {
      setOpen(false);
    }
  };

  const handleCalendarSelect = (range: { from?: Date; to?: Date } | undefined) => {
    setActivePreset(null);
    onChange({ from: range?.from, to: range?.to });
  };

  const label = () => {
    if (activePreset && activePreset !== "Máximo") return activePreset;
    if (!value.from && !value.to) return "Todos os períodos";
    if (value.from && !value.to) return format(value.from, "dd/MM/yyyy", { locale: ptBR });
    if (value.from && value.to) {
      if (format(value.from, "yyyy-MM-dd") === format(value.to, "yyyy-MM-dd")) {
        return format(value.from, "dd/MM/yyyy", { locale: ptBR });
      }
      return `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(value.to, "dd/MM/yyyy", { locale: ptBR })}`;
    }
    return "Selecionar período";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 justify-start text-left font-normal gap-2",
            !value.from && !value.to && "text-muted-foreground"
          )}
        >
          <CalendarIcon size={16} />
          {label()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col sm:flex-row">
          {/* Presets sidebar */}
          <div className="border-b sm:border-b-0 sm:border-r border-border p-3 sm:w-44 max-h-64 sm:max-h-none overflow-y-auto">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Atalhos</p>
            <div className="flex flex-row flex-wrap sm:flex-col gap-1">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "text-left text-sm px-3 py-1.5 rounded-md transition-colors whitespace-nowrap",
                    activePreset === preset.label
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              selected={value.from ? { from: value.from, to: value.to } : undefined}
              onSelect={handleCalendarSelect}
              numberOfMonths={1}
              locale={ptBR}
              disabled={(date) => date > new Date()}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
