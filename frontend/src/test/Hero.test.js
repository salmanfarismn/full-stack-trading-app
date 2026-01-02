import React from 'react';
import { getAllByAltText, getByAltText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Hero from "../landing_page/home/Hero";

// Test Suite
describe('Hero Component', () => {
    test('render hero image', () => {
        render(<Hero />);
        const heroImage = screen.getByAltText("Hero Image");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', '/images/homeHero.png');
    });

    test('render signup button', () => {
        render(<Hero />);
        // const button = screen.getByRole('button', { name: /Signup Now/i}); => Using RegExp
        const button = screen.getByRole('button', { name: "Signup Now"}); // Using exact string match 
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("btn-primary");
    })
})