import { render, screen } from '@testing-library/react';
import Footer from '@/src/components/ui/footer/footer';
import '@testing-library/jest-dom';

describe(Footer, () => {
    it('renders footer element', () => {
        render(<Footer/>)
        
        const element = screen.getByRole("footer");
        expect(element).toBeInTheDocument;
    })

    it('has correct custom class', () => {
        const className = "customClass";
        render(<Footer className={className}/>)
        
        const element = screen.getByRole("footer");
        expect(element.classList.contains(className)).toBeTruthy();
    })
})