import { render, screen } from '@testing-library/react';
import Button from '@/src/components/ui/button/button';
import '@testing-library/jest-dom';

describe(Button, () => {
    it('renders button element', () => {
        render(
            <Button onClick={() => {}}>content</Button>
        )

        const element = screen.getByRole("button");
        expect(element).toBeInTheDocument();
    })

    it('has correct text content', () => {
        const content = 'content';
        render(
            <Button onClick={() => {}}>{content}</Button>
        )

        const element = screen.getByRole("button");
        expect(element).toHaveTextContent(content);
    })

    it('has correct custom class', () => {
        const className = 'customClass';
        render(
            <Button onClick={() => {}} className={className}>content</Button>
        )

        const element = screen.getByRole("button");
        expect(element.classList.contains(className)).toBeTruthy();
    })
})