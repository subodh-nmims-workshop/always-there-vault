// src/__tests__/mode-service.test.ts
import ModeService from '../lib/mode-service';
import WebStorageService from '../lib/storage';

// Mock localStorage
const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: function (key: string) { return store[key] || null; },
        setItem: function (key: string, value: string) { store[key] = value.toString(); },
        clear: function () { store = {}; }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('ModeService', () => {
    let modeService: ModeService;

    beforeEach(() => {
        window.localStorage.clear();
        // Simulate centralized mode as default
        modeService = ModeService.getInstance();
        (global.fetch as jest.Mock).mockClear();
    });

    describe('Initialization', () => {
        it('should default to centralized mode if no local storage preference exists', () => {
            expect(modeService.getMode()).toBe('centralized');
        });

        it('should use mode from local storage if exists', () => {
            window.localStorage.setItem('dwp_mode', 'decentralized');
            // Hack to reset singleton for test
            (ModeService as any).instance = undefined;
            const newService = ModeService.getInstance();
            expect(newService.getMode()).toBe('decentralized');
        });
    });

    describe('saveAsset (Centralized)', () => {
        const mockAsset = {
            id: 'test_123',
            name: 'Test Asset',
            type: 'document',
            encryptedData: '0x123...',
            keyId: 'key_1',
            iv: 'iv_1',
            createdAt: Date.now(),
            size: 1024,
            mimeType: 'text/plain'
        };

        it('should return syncPending: true if backend fetch fails', async () => {
            // Mock fetch to simulate a 500 error or network failure
            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

            const result = await modeService.saveAsset(mockAsset as any);

            expect(result.success).toBe(true);
            expect(result.id).toBe('test_123');
            expect(result.syncPending).toBe(true);
            expect(global.fetch).toHaveBeenCalled();
        });

        it('should return successfully without syncPending if backend responds OK', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true })
            });

            const result = await modeService.saveAsset(mockAsset as any);

            expect(result.success).toBe(true);
            expect(result.id).toBe('test_123');
            expect(result.syncPending).toBeFalsy();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
