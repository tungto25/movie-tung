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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieTypeProvider>
        <EpisodeProvider>
          <PlanProvider>
            <FeatureProvider>
              <PackageProvider>
                <MovieProvider>
                  <ActorProvider>
                    <CharacterProvider>
                      <AuthorProvider>
                        <CountryProvider>
                          <SectionProvider>
                            <CategoriesProvider>
                              <App />
                            </CategoriesProvider>
                          </SectionProvider>
                        </CountryProvider>
                      </AuthorProvider>
                    </CharacterProvider>
                  </ActorProvider>
                </MovieProvider>
              </PackageProvider>
            </FeatureProvider>
          </PlanProvider>
        </EpisodeProvider>
      </MovieTypeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
