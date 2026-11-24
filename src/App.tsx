import { useState } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ParkingSimulator } from './components/ParkingSimulator';
import { ConceptsSection } from './components/ConceptsSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { SourceCodeSection } from './components/SourceCodeSection';
import { VerificationAndReportSection } from './components/VerificationAndReportSection';
import {
  createParkingLot,
  logDisplayParked,
  logDisplayWaiting,
  type ParkingLotState,
  vehicleEntry,
  vehicleExit,
} from './simulation/parkingLot';
import {
  PROJECT_METADATA,
  REPORT_PDF_URL,
  type TestCaseItem,
  type WalkthroughPreset,
} from './data/reportData';

function createInitialDemoState(): ParkingLotState {
  // Start with 2 vehicles parked in a 3-slot lot so visitors immediately see LIFO slots in action
  let state = createParkingLot(3);
  state = vehicleEntry(state, 'MH12AB1234');
  state = vehicleEntry(state, 'DL01CD5678');
  return state;
}

export default function App() {
  const [lotState, setLotState] = useState<ParkingLotState>(createInitialDemoState);
  const [activePresetId, setActivePresetId] = useState<WalkthroughPreset['id'] | null>(null);
  const [presetStep, setPresetStep] = useState(0);

  function handleSelectPreset(id: WalkthroughPreset['id'] | null, step = 0) {
    setActivePresetId(id);
    setPresetStep(step);
  }

  function handleRunTestCase(action: NonNullable<TestCaseItem['demoAction']>) {
    setActivePresetId(null);
    setPresetStep(0);

    let state = createParkingLot(2);
    switch (action) {
      case 'free-slot':
        state = vehicleEntry(state, 'MH12AB1234');
        break;
      case 'full-lot':
        state = vehicleEntry(state, 'MH12AB1234');
        state = vehicleEntry(state, 'DL01CD5678');
        state = vehicleEntry(state, 'UP16EF9012');
        break;
      case 'empty-exit':
        state = vehicleExit(state);
        break;
      case 'dup-parked':
        state = vehicleEntry(state, 'MH12AB1234');
        state = vehicleEntry(state, 'MH12AB1234');
        break;
      case 'dup-waiting':
        state = vehicleEntry(state, 'MH12AB1234');
        state = vehicleEntry(state, 'DL01CD5678');
        state = vehicleEntry(state, 'UP16EF9012');
        state = vehicleEntry(state, 'UP16EF9012');
        break;
      case 'auto-park':
        state = vehicleEntry(state, 'MH12AB1234');
        state = vehicleEntry(state, 'DL01CD5678');
        state = vehicleEntry(state, 'UP16EF9012');
        state = vehicleEntry(state, 'HR26GH3456');
        state = vehicleExit(state);
        break;
      case 'display-lists':
        state = vehicleEntry(state, 'MH12AB1234');
        state = vehicleEntry(state, 'DL01CD5678');
        state = vehicleEntry(state, 'UP16EF9012');
        state = logDisplayParked(state);
        state = logDisplayWaiting(state);
        break;
    }

    setLotState(state);
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav />
      <main>
        <HeroSection />
        <ParkingSimulator
          lotState={lotState}
          onChangeState={setLotState}
          activePresetId={activePresetId}
          presetStep={presetStep}
          onSelectPreset={handleSelectPreset}
        />
        <ConceptsSection />
        <ArchitectureSection />
        <SourceCodeSection />
        <VerificationAndReportSection onRunTestCase={handleRunTestCase} />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <div>
            <p className="font-medium text-slate-800">
              {PROJECT_METADATA.title} · {PROJECT_METADATA.institute}
            </p>
            <p className="mt-1">
              {PROJECT_METADATA.team.map((m) => m.name).join(', ')} ({PROJECT_METADATA.section}) · Guided by {PROJECT_METADATA.submittedTo} · Session {PROJECT_METADATA.academicSession}
            </p>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <a href="#simulator" className="hover:text-slate-900 transition-colors">
              Simulator
            </a>
            <a href="#source-code" className="hover:text-slate-900 transition-colors">
              Source Code
            </a>
            <a
              href={REPORT_PDF_URL}
              download="Smart-Parking-Lot-Project-Report.pdf"
              className="font-medium text-slate-800 hover:text-blue-700 transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
