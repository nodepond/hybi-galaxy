import { useEffect } from 'react'
import { Button } from '../../common/Buttons/Button'
import { Mediaselect } from '../../Modals/Mediaselect/Mediaselect'
import { useLocalStore } from '../../../store/LocalStore'
import ReactModal from 'react-modal'


export const MediaSelectButton = () => {
  const showMediaselect = useLocalStore(store => store.showMediaselect)
  const toggleMediaselect = useLocalStore(store => store.toggleMediaselect)

  useEffect(() => {
    // https://stackoverflow.com/a/49970032/274518
    if (typeof(window) !== 'undefined') {
      ReactModal.setAppElement('body')
    }
  }, [])

  useEffect(() => {
    console.log('showMediaselect', showMediaselect)
  }, [showMediaselect])

  return (
    <>
      <Button type="secondary" onClick={toggleMediaselect}>Audio / Video</Button>
      <ReactModal
        isOpen={showMediaselect}
      >
        <Mediaselect />
      </ReactModal>
    </>
  )
}
