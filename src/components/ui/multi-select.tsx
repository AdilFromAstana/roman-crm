// components/ui/multi-select.tsx
'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, PlusCircle, X } from 'lucide-react';

interface MultiSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const selectedItems = options.filter((option) =>
    value.includes(option.value)
  );

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('h-auto min-h-10 w-full justify-between', className)}
        >
          <div className='flex flex-wrap gap-1'>
            {selectedItems.length === 0 && (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
            {selectedItems.map((item) => (
              <Badge
                key={item.value}
                variant='secondary'
                className='mr-1 mb-1 py-1 pr-1 pl-2'
              >
                {item.label}
                <button
                  className='ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      removeOption(item.value, e as any);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => removeOption(item.value, e)}
                >
                  <X className='text-muted-foreground hover:text-foreground h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Command>
          <CommandInput
            placeholder='Поиск...'
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key='select-all'
                onSelect={() => {
                  if (value.length === options.length) {
                    onChange([]);
                  } else {
                    onChange(options.map((o) => o.value));
                  }
                }}
                className='cursor-pointer'
              >
                <div className='flex items-center'>
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.length === options.length
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  Выбрать все
                </div>
              </CommandItem>
              <Separator className='my-1' />
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className='cursor-pointer'
                  >
                    <div className='flex items-center'>
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
