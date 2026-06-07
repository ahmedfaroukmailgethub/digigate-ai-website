import { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import SectorsIndexPage from './pages/SectorsIndexPage'
import SectorPage from './pages/SectorPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ProductsIndexPage from './pages/ProductsIndexPage'
import AboutIntroPage from './pages/AboutIntroPage'
import AboutValuesPage from './pages/AboutValuesPage'
import AboutPhilosophyPage from './pages/AboutPhilosophyPage'
import AboutVisionPage from './pages/AboutVisionPage'
import AboutMissionPage from './pages/AboutMissionPage'
import DocumentsManagementPage from './pages/products/DocumentsManagementPage'
import CorrespondenceManagementPage from './pages/products/CorrespondenceManagementPage'
import RecordsManagementPage from './pages/products/RecordsManagementPage'
import WorkflowEnginePage from './pages/products/WorkflowEnginePage'
import InformationRightManagementPage from './pages/products/InformationRightManagementPage'
import StandardCaptureToolPage from './pages/products/StandardCaptureToolPage'
import AdvancedViewerToolPage from './pages/products/AdvancedViewerToolPage'
import DataStorageOptimizationPage from './pages/products/DataStorageOptimizationPage'
import IntegrationEnablerModulePage from './pages/products/IntegrationEnablerModulePage'
import AIEnginesPage from './pages/products/AIEnginesPage'
import IntelligentAutomationModulePage from './pages/products/IntelligentAutomationModulePage'
import IntelligentDocumentsRecognitionPage from './pages/products/IntelligentDocumentsRecognitionPage'
import IntelligentDocumentCapturePage from './pages/products/IntelligentDocumentCapturePage'
import IntelligentDataExtractionPage from './pages/products/IntelligentDataExtractionPage'
import IntelligentDocumentExportingPage from './pages/products/IntelligentDocumentExportingPage'
import IntelligentDocumentsClassificationPage from './pages/products/IntelligentDocumentsClassificationPage'
import VoiceRecognitionEnginePage from './pages/products/VoiceRecognitionEnginePage'
import EducationPlatformPage from './pages/products/EducationPlatformPage'
import CareersPage from './pages/CareersPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage, { isAuthenticated } from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import WorkspacePage from './pages/WorkspacePage'

function ProtectedPage({ children }: { children: ReactNode }) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/intro" element={<AboutIntroPage />} />
            <Route path="/about/values" element={<AboutValuesPage />} />
            <Route path="/about/philosophy" element={<AboutPhilosophyPage />} />
            <Route path="/about/vision" element={<AboutVisionPage />} />
            <Route path="/about/mission" element={<AboutMissionPage />} />
            <Route path="/products" element={<ProductsIndexPage />} />
            <Route path="/products/documents-management-system" element={<DocumentsManagementPage />} />
            <Route path="/products/correspondence-management-system" element={<CorrespondenceManagementPage />} />
            <Route path="/products/records-management-system" element={<RecordsManagementPage />} />
            <Route path="/products/workflow-engine" element={<WorkflowEnginePage />} />
            <Route path="/products/information-right-management-system" element={<InformationRightManagementPage />} />
            <Route path="/products/standard-capture-tool" element={<StandardCaptureToolPage />} />
            <Route path="/products/advanced-viewer-tool" element={<AdvancedViewerToolPage />} />
            <Route path="/products/data-storage-optimization-tool" element={<DataStorageOptimizationPage />} />
            <Route path="/products/integration-enabler-module" element={<IntegrationEnablerModulePage />} />
            <Route path="/products/artificial-intelligence-engines" element={<AIEnginesPage />} />
            <Route path="/products/intelligent-automation-module" element={<IntelligentAutomationModulePage />} />
            <Route path="/products/intelligent-documents-recognition-engine" element={<IntelligentDocumentsRecognitionPage />} />
            <Route path="/products/intelligent-document-capture-module" element={<IntelligentDocumentCapturePage />} />
            <Route path="/products/intelligent-data-extraction-module" element={<IntelligentDataExtractionPage />} />
            <Route path="/products/intelligent-document-exporting-module" element={<IntelligentDocumentExportingPage />} />
            <Route path="/products/intelligent-documents-classification-engine" element={<IntelligentDocumentsClassificationPage />} />
            <Route path="/products/voice-recognition-engine" element={<VoiceRecognitionEnginePage />} />
            <Route path="/products/education-platform" element={<EducationPlatformPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedPage><DashboardPage /></ProtectedPage>} />
            <Route path="/workspace" element={<ProtectedPage><WorkspacePage /></ProtectedPage>} />
            <Route path="/sectors" element={<SectorsIndexPage />} />
            <Route path="/sectors/:slug" element={<SectorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
