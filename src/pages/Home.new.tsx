import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import AnimatedText from '../components/animations/AnimatedText';
import HoverCard from '../components/animations/HoverCard';
import TiltCard from '../components/interactive/TiltCard';

// Lazy loaded components
const LazySkillShowcase = lazy(() => import('../components/interactive/SkillShowcase'));
const LazyCertificateShowcase = lazy(() => import('../components/interactive/CertificateShowcase'));
const LazyCodeShowcase = lazy(() => import('../components/interactive/CodeShowcase'));
const LazySlideshow = lazy(() => import('../components/interactive/Slideshow'));
const LazyGitHubActivity = lazy(() => import('../components/interactive/GitHubActivity'));
const LazyTestimonials = lazy(() => import('../components/interactive/Testimonials'));
const LazyAchievements = lazy(() => import('../components/sections/Achievements'));
const LazyExperienceTimeline = lazy(() => import('../components/sections/ExperienceTimeline'));
