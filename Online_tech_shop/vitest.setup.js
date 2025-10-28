import { expect } from 'vitest';
import {
    toBeInTheDocument,
    toHaveTextContent,
    toHaveAttribute,
    // Добавьте другие необходимые матчеры
} from '@testing-library/jest-dom/matchers';

// Расширяем expect только нужными матчерами
expect.extend({
    toBeInTheDocument,
    toHaveTextContent,
    toHaveAttribute
});

import '@testing-library/jest-dom';