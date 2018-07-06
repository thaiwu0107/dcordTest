import { expect } from 'chai';
import { anything, instance, mock, reset, spy, when } from 'ts-mockito';
import Repository from './Repository';
import Service from './Service';

describe('BonusMemberIDService', () => {
    let test: Service;
    let repository: Repository;
    let mockSelf: Service;
    let expectDone;
    const expected = (target?: any, message?: string) => {
        expectDone = true;
        return expect(target, message);
    };
    beforeEach(() => {
        expectDone = false;
        repository = mock(Repository);
        test = new Service(instance(repository));
        mockSelf = spy(test);
    });
    afterEach('這個方法有寫驗證但是沒有驗證到', () => {
        expect(expectDone).to.equal(true);
        reset(mockSelf);
        reset(repository);
    });
    describe('test()', () => {
        it('1.沒有這個key,就創建這個key再設置過期時間', async () => {
            // tslint:disable-next-line:no-null-keyword
            when(repository.getIP(anything())).thenReturn(Promise.resolve(null));
            when(repository.setIP(anything(), anything())).thenReturn(Promise.resolve('OK'));
            const repos = await test.test(anything());
            expected(repos).to.deep.equal({ times: 1 });
        });
        it('2.如果這個key大於等於60了,就拋出ERROR', async () => {
            when(repository.getIP(anything())).thenReturn(Promise.resolve(60));
            try {
                const a = await test.test(anything());
            } catch (error) {
                expected(error.message.message).to.deep.equal('ERROR');
            }
        });
        it('3.如果這個key存在且小於60', async () => {
            when(repository.getIP(anything())).thenReturn(Promise.resolve(10));
            when(repository.incr(anything())).thenReturn(Promise.resolve('OK'));
            const repos = await test.test(anything());
            expected(repos).to.deep.equal({ times: 11 });
        });
    });
});
