import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useContacts } from '@/hooks/useContacts';
import { ContactIcon, Search } from 'lucide-react';

interface Contact {
  name: string;
  phone?: string;
}

interface ContactSelectorProps {
  onContactSelect: (contact: Contact) => void;
  children?: React.ReactNode;
}

export const ContactSelector = ({ onContactSelect, children }: ContactSelectorProps) => {
  const { contacts, requestPermission, hasPermission } = useContacts();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenChange = async (open: boolean) => {
    if (open && !hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        return;
      }
    }
    setIsOpen(open);
  };

  const handleContactSelect = (contact: Contact) => {
    onContactSelect(contact);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.phone && contact.phone.includes(searchTerm))
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <ContactIcon className="h-4 w-4 mr-2" />
            Select Contact
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Contact</DialogTitle>
          <DialogDescription>
            Choose a contact from your phone to add as a family member.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted cursor-pointer rounded-md border border-transparent hover:border-border transition-colors"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="font-medium">{contact.name}</div>
                    {contact.phone && (
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  {searchTerm ? 'No contacts match your search' : 'No contacts available'}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};