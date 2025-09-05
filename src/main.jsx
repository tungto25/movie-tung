import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesProvider } from './contexts/CategoryProvider';
import { SectionProvider } from './contexts/SectionProvider';
import { CountryProvider } from './contexts/CountryProvider';
import { AuthorProvider } from './contexts/AuthorProvider';
import { CharacterProvider } from './contexts/CharacterProvider';
import { ActorProvider } from './contexts/ActorProvider';
import { MovieProvider } from './contexts/MovieProvider';
import { PackageProvider } from './contexts/PackageProvider';
import { FeatureProvider } from './contexts/FeatureProvider';
import { PlanProvider } from './contexts/PlanProvider';
import { EpisodeProvider } from './contexts/EpisodeProvider';
import { MovieTypeProvider } from './contexts/MovieTypeProvider';
import { AccountProvider } from './contexts/AccountProvider';
import { AuthProvider } from "./contexts/AuthProvider";
const providers = [
  AccountProvider,
  MovieTypeProvider,
  EpisodeProvider,
  PlanProvider,
  FeatureProvider,
  PackageProvider,
  MovieProvider,
  ActorProvider,
  CharacterProvider,
  AuthorProvider,
  CountryProvider,
  SectionProvider,
  CategoriesProvider,
  AuthProvider,
];

const ComposeProviders = ({ providers, children }) =>
  providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ComposeProviders providers={providers}>
        <App />
      </ComposeProviders>
    </BrowserRouter>
  </React.StrictMode>
);
