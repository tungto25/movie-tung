import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './contexts/CategoryProvider';
import { MovieTypeProvider } from './contexts/MovieTypeProvider';
import { CountryProvider } from './contexts/CountryProvider';
import { AuthorProvider } from './contexts/AuthorProvider';
import { CharacterProvider } from './contexts/CharacterProvider';
import { ActorProvider } from './contexts/ActorProvider';
import { MovieProvider } from './contexts/MovieProvider';
import { PackageProvider } from './contexts/PackageProvider';
import { FeatureProvider } from './contexts/FeatureProvider';
import { PlanProvider } from './contexts/PlanProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlanProvider>
        <FeatureProvider>
          <PackageProvider>
            <MovieProvider>
              <ActorProvider>
                <CharacterProvider>
                  <AuthorProvider>
                    <CountryProvider>
                      <MovieTypeProvider>
                        <CategoriesProvider>
                          <App />
                        </CategoriesProvider>
                      </MovieTypeProvider>
                    </CountryProvider>
                  </AuthorProvider>
                </CharacterProvider>
              </ActorProvider>
            </MovieProvider>
          </PackageProvider>
        </FeatureProvider>
      </PlanProvider>
    </BrowserRouter>
  </React.StrictMode>
);
